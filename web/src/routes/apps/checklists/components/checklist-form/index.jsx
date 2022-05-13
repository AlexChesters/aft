import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

import CustomPropTypes from '../../../../../custom-prop-types'

import LoadingSpinner from '../../../../../components/loading-spinner'
import ErrorDialog from '../../../../../components/error-dialog'

import apiClient from '../../../../../networking/api-client'

import './index.scss'

const ChecklistForm = (props) => {
  const { identifier, initialData } = props
  const [loading, setLoading] = useState(true)
  const [errored, setErrored] = useState(false)
  const [aircraft, setAircraft] = useState([])
  const [retryId, setRetryId] = useState(null)
  const [allSections, setAllSections] = useState(initialData ? initialData.sections : [])
  const history = useHistory()

  const getFormState = () => {
    const aircraft = document.getElementById('aircraft').value
    const sections = []
    for (let i = 0; i < document.querySelectorAll('div.create--form__section').length; i++) {
      const section = document.querySelectorAll('div.create--form__section')[i]
      const title = section.querySelectorAll('.form-group')[0].querySelectorAll('.form-control')[0].value
      const entries = section.querySelectorAll('.form-group')[1].querySelectorAll('.form-control')[0].value.split('\n').filter(Boolean)
      sections.push({ title, entries })
    }
    const notes = document.getElementById('notes').value

    return {
      identifier,
      aircraft,
      sections,
      notes
    }
  }

  const onSubmit = async (evt) => {
    evt.preventDefault()

    const result = await apiClient.checklists.save(identifier, getFormState())

    if (result.error) {
      setErrored(true)
      setRetryId(result.retryId)
      return
    }

    history.push(`/checklists/view/${result.data.identifier}`)
  }

  const onRetry = async () => {
    const result = await apiClient.retryRequest(retryId)
    if (result.error) {
      setErrored(true)
      setRetryId(result.retryId)
    } else {
      setErrored(false)
      setRetryId(null)

      history.push(`/checklists/view/${result.data.identifier}`)
    }
  }

  const onCreateSection = () => {
    const newArr = Array.from(allSections)
    newArr.push({})
    setAllSections(newArr)
  }

  const onDeleteSection = async (index) => {
    const newArr = Array.from(allSections)
    newArr.splice(index, 1)
    setAllSections(newArr)
  }

  const Sections = () => {
    const sections = []

    for (let i = 0; i < allSections.length; i++) {
      const section = allSections[i]
      sections.push(
        (
          <div key={i} className='create--form__section'>
            <Form.Group>
              <Form.Label className='create--form label label__title'>
                Section <sup onClick={() => { onDeleteSection(i) }}>(X)</sup>
              </Form.Label>
              <Form.Control
                as='select'
                id={`form-input-section-${i}-title`}
                className='create--form select'
                onChange={(e) => {
                  const newArr = Array.from(allSections)
                  const item = newArr[i]
                  item.title = e.target.value
                  setAllSections(newArr)
                }}
                value={section.title || ''}
              >
                <option value='Preflight'>Preflight</option>
                <option value='Cockpit preparation'>Cockpit preparation</option>
                <option value='FMC'>FMC</option>
                <option value='Before pushback'>Before pushback</option>
                <option value='Pushback'>Pushback</option>
                <option value='Engine start'>Engine start</option>
                <option value='Taxi'>Taxi</option>
                <option value='Take-off'>Take-off</option>
                <option value='Climb'>Climb</option>
                <option value='Cruise'>Cruise</option>
                <option value='Descent'>Descent</option>
                <option value='Approach'>Approach</option>
                <option value='Landing'>Landing</option>
                <option value='Go around'>Go around</option>
                <option value='Divert'>Divert</option>
                <option value='Turnaround'>Turnaround</option>
                <option value='Shutdown'>Shutdown</option>
              </Form.Control>
              <Form.Control
                as='select'
                id={`form-input-section-${i}-index`}
                className='create--form select select__right-aligned'
                value={i}
                onChange={(e) => {
                  const newArr = Array.from(allSections)
                  const item = newArr[i]
                  newArr.splice(i, 1)
                  newArr.splice(e.target.value, 0, item)
                  setAllSections(newArr)
                }}
              >
                {
                  allSections.map((_, sectionIndex) => (
                    <option
                      key={sectionIndex}
                      value={sectionIndex}>
                      {sectionIndex + 1}
                    </option>
                  ))
                }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className='create--form label label__info'>
                Write each separate entry on its own line
              </Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Battery 1 + 2 - ON'
                defaultValue={section.entries ? section.entries.join('\n') : ''}
                key={section.entries ? section.entries.join('\n') : ''}
                rows={7}
              />
            </Form.Group>
          </div >
        )
      )
    }

    return sections
  }

  useEffect(async () => {
    const { data, error } = await apiClient.aircraft.list()

    if (error) {
      setErrored(true)
      setLoading(false)
      return
    }

    setAircraft(data)
    setLoading(false)
  }, [])

  if (errored) {
    return (
      <ErrorDialog className='sdasda'>
        <p>Click <span onClick={onRetry} className='clickable'>here</span> to retry.</p>
      </ErrorDialog>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!aircraft.length) return null

  return (
    <Form onSubmit={onSubmit} className='create--form'>
      <Form.Group>
        <Form.Label className='create--form label label__title'>
          Aircraft
        </Form.Label>
        <Form.Control
          as='select'
          id='aircraft'
          defaultValue={initialData && initialData.aircraft}
        >
          {
            aircraft.map(({ name, value }, index) => {
              return (
                <option value={value} key={index}>{name}</option>
              )
            })
          }
        </Form.Control>
      </Form.Group>
      {Sections()}
      <Form.Label className='create--form label label__title'>Notes</Form.Label>
      <Form.Group className='create--form notes'>
        <Form.Control
          as='textarea'
          id='notes'
          rows={2}
          defaultValue={initialData && initialData.notes}
        />
      </Form.Group>
      <Button
        className='button'
        onClick={onCreateSection}
      >
        Create additional section
      </Button>
      <Button className='button' type='submit'>Save checklist</Button>
    </Form>
  )
}

ChecklistForm.propTypes = {
  identifier: PropTypes.string,
  initialData: CustomPropTypes.checklist
}

export default ChecklistForm

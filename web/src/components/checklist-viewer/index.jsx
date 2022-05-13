import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDownload, faUndo } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import customPropTypes from '../../custom-prop-types'
import persistentStorage from '../../utils/persistent-storage'

import './index.scss'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const ChecklistViewer = ({ checklist, showButtons }) => {
  const storage = persistentStorage.checklistState

  const defaultState = storage.get(checklist.identifier) || {
    identifier: checklist.identifier,
    completedEntries: []
  }

  const history = useHistory()
  const [checklistState, setChecklistState] = useState(defaultState)

  useEffect(() => {
    const state = storage.get(checklist.identifier)

    if (!state) return

    state.completedEntries.forEach((sectionEntryId) => {
      const sectionEntry = document.getElementById(sectionEntryId)
      sectionEntry.classList.add('strikethrough')
      sectionEntry.classList.add('italic')
      sectionEntry.classList.add('green-color')
    })
  }, [])

  useEffect(() => {
    storage.set(checklist.identifier, checklistState)
  }, [checklistState])

  const onExport = () => {
    const content = []

    content.push({
      text: checklist.aircraft,
      style: 'title'
    })
    content.push({
      text: checklist.notes,
      style: 'subtitle',
      lineHeight: 2
    })

    checklist.sections.forEach((section) => {
      content.push({
        text: section.title,
        style: 'sectionHeader'
      })

      section.entries.forEach((entry, index, arr) => {
        content.push({
          text: entry,
          lineHeight: (arr.length === index + 1) ? 2 : 1
        })
      })
    })

    const dd = {
      pageOrientation: 'portrait',
      pageSize: 'a4',
      styles: {
        title: {
          fontSize: 18,
          bold: true
        },
        subtitle: {
          fontSize: 12,
          italics: true
        },
        sectionHeader: {
          fontSize: 16,
          bold: true
        }
      },
      content
    }

    pdfMake.createPdf(dd).open()
  }

  const onEdit = () => {
    history.push(`/checklists/edit/${checklist.identifier}`)
  }

  const onReset = () => {
    const entries = document.querySelectorAll('[id^=\'checklist-viewer-section-\']')
    entries.forEach((entry) => {
      entry.classList.remove('italic')
      entry.classList.remove('green-color')
      entry.classList.remove('strikethrough')
    })
    setChecklistState({
      identifier: checklist.identifier,
      completedEntries: []
    })
  }

  const markEntryCompleted = (sectionEntryId) => {
    const sectionEntry = document.getElementById(sectionEntryId)
    sectionEntry.classList.toggle('strikethrough')
    sectionEntry.classList.toggle('italic')
    sectionEntry.classList.toggle('green-color')

    if (sectionEntry.classList.contains('strikethrough')) {
      const entries = checklistState.completedEntries
      entries.push(sectionEntryId)
      setChecklistState({
        ...checklistState,
        completedEntries: entries
      })
    } else {
      const entries = checklistState.completedEntries
      entries.splice(entries.indexOf(sectionEntryId), 1)
      setChecklistState({
        ...checklistState,
        completedEntries: entries
      })
    }
  }

  return (
    <section className='checklist-viewer'>
      {
        showButtons && (
          <div>
            <Button
              className='button'
              title='Export'
              onClick={() => onExport()}
            >
              <FontAwesomeIcon icon={faDownload} />
            </Button>
            <Button
              className='button'
              title='Reset completed entries'
              onClick={() => onReset()}
            >
              <FontAwesomeIcon icon={faUndo} />
            </Button>
            <Button
              className='button'
              title='Edit'
              onClick={() => onEdit()}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        )
      }
      <h1 className='checklist-viewer__page-title'>{checklist.aircraft}</h1>
      <p className='checklist-viewer__page-notes italic'>{checklist.notes}</p>
      {
        checklist.sections && checklist.sections.map(({ title, entries }, sectionIndex) => {
          return (
            <Accordion key={sectionIndex} className='checklist-viewer--section'>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Card.Header} eventKey={`${sectionIndex}`}>
                    {title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={`${sectionIndex}`}>
                  <Card.Body>
                    {
                      entries.map((entry, sectionEntryIndex) => (
                        <p
                          key={sectionEntryIndex}
                          id={`checklist-viewer-section-${sectionIndex}-entry-${sectionEntryIndex}`}
                          onClick={() => (
                            markEntryCompleted(
                              `checklist-viewer-section-${sectionIndex}-entry-${sectionEntryIndex}`
                            )
                          )}
                        >
                          {entry}
                        </p>
                      ))
                    }
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )
        })
      }
    </section>
  )
}

ChecklistViewer.propTypes = {
  checklist: customPropTypes.checklist.isRequired,
  showButtons: PropTypes.bool
}

export default ChecklistViewer

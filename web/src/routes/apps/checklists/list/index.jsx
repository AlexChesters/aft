import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCopy } from '@fortawesome/free-solid-svg-icons'

import LoadingSpinner from '../../../../components/loading-spinner'
import ErrorDialog from '../../../../components/error-dialog'

import apiClient from '../../../../networking/api-client'

import './index.scss'

const Home = () => {
  const [errored, setErrored] = useState(false)
  const [loading, setLoading] = useState(true)
  const [checklists, setChecklists] = useState([])
  const history = useHistory()

  async function fetchData () {
    const { data, error } = await apiClient.checklists.fetchAll()

    error
      ? setErrored(true)
      : setChecklists(data)

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onCopyChecklist = async (identifier) => {
    setLoading(true)
    const { data } = await apiClient.checklists.duplicate(identifier)
    history.push(`/checklists/view/${data.identifier}`)
  }

  const onDeleteChecklist = async (identifier, aircraft) => {
    const confirmationMessage = `
    Are you sure you want to delete your ${aircraft} checklist?

    [WARNING] - this cannot be undone.
    `
    if (window.confirm(confirmationMessage)) {
      await apiClient.checklists.delete(identifier)
      fetchData()
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (errored) {
    return <ErrorDialog />
  }

  return (
    <section className='checklists'>
      <Link
        className='checklists--table__aircraft-title'
        to='/checklists/create'
      >
        Create a new checklist
      </Link>
      <table className='checklists--table'>
        {
          checklists
            .sort(({ aircraft: a }, { aircraft: b }) => {
              if (a < b) return -1
              if (a > b) return 1
              return 0
            })
            .map((checklist, index) => {
              const { aircraft, notes, identifier } = checklist

              return (
                <tbody key={index}>
                  <tr>
                    <td className='checklists--table__aircraft-title-cell'>
                      <Link
                        className='checklists--table__aircraft-title'
                        to={`/checklists/view/${identifier}`}
                      >
                        {aircraft}
                      </Link>
                    </td>
                    <td className='checklists--table__button-cell'>
                      <Button
                        className='button'
                        title='Copy'
                        onClick={() => { onCopyChecklist(identifier) }}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </Button>
                    </td>
                    <td className='checklists--table__button-cell'>
                      <Button
                        className='button'
                        title='Delete'
                        onClick={() => onDeleteChecklist(identifier, aircraft)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className='italic'>{notes}</p>
                    </td>
                  </tr>
                </tbody>
              )
            })
        }
      </table>
    </section>
  )
}

export default Home

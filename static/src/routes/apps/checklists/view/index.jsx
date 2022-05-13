import React, { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'

import './index.scss'

import LoadingSpinner from '../../../../components/loading-spinner'
import ErrorDialog from '../../../../components/error-dialog'
import ChecklistViewer from '../../../../components/checklist-viewer'

import apiClient from '../../../../networking/api-client'

const Viewer = () => {
  const [authenticated, setAuthenticated] = useState(true)
  const [errored, setErrored] = useState(false)
  const [loading, setLoading] = useState(true)
  const [checklist, setChecklist] = useState({})

  const { identifier } = useParams()

  async function fetchData () {
    const { status, data, error } = await apiClient.checklists.fetchOne(identifier)

    if (status === 401) {
      setAuthenticated(false)
      return
    }

    setLoading(false)

    if (error) {
      setErrored(true)
      return
    }

    setChecklist(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!authenticated) {
    return <Redirect to={{ pathname: '/auth/sign-in', state: { returnToPath: window.location.pathname } }} />
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (errored) {
    return <ErrorDialog />
  }

  if (!Object.keys(checklist).length) return null

  return (
    <section className='checklist'>
      <ChecklistViewer checklist={checklist} showButtons={true} />
    </section>
  )
}

export default Viewer

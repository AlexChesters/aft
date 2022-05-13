import React, { useState, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import LoadingSpinner from '../../../../components/loading-spinner'
import Form from '../components/checklist-form'

import './index.scss'

import apiClient from '../../../../networking/api-client'

const Edit = () => {
  const [authenticated, setAuthenticated] = useState(true)
  const [loading, setLoading] = useState(true)
  const [checklist, setChecklist] = useState({})

  const { identifier } = useParams()

  async function fetchData () {
    const { status, data } = await apiClient.checklists.fetchOne(identifier)

    if (status === 401) {
      setAuthenticated(false)
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

  return (
    <section className='edit--container'>
      <Form identifier={identifier} initialData={{ ...checklist }} />
    </section>
  )
}

export default Edit

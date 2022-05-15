import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import LoadingSpinner from '../../../../components/loading-spinner'
import ErrorDialog from '../../../../components/error-dialog'
import Form from '../components/checklist-form'

import './index.scss'

import apiClient from '../../../../networking/api-client'

const Edit = () => {
  const [errored, setErrored] = useState(false)
  const [loading, setLoading] = useState(true)
  const [checklist, setChecklist] = useState({})

  const { identifier } = useParams()

  async function fetchData () {
    const { error, data } = await apiClient.checklists.fetchOne(identifier)

    setLoading(false)
    error
      ? setErrored(true)
      : setChecklist(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (errored) {
    return <ErrorDialog />
  }

  return (
    <section className='edit--container'>
      <Form identifier={identifier} initialData={{ ...checklist }} />
    </section>
  )
}

export default Edit

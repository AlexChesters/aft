import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Divider from '../../../../components/divider'
import LoadingSpinner from '../../../../components/loading-spinner'
import ErrorDialog from '../../../../components/error-dialog'

import apiClient from '../../../../networking/api-client'

import './index.scss'

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [errored, setErrored] = useState(false)
  const [unknownAirport, setUnknownAirport] = useState(false)
  const [data, setData] = useState({})

  const { identifier } = useParams()

  useEffect(async () => {
    const result = await apiClient.airports.search(identifier)

    console.log('res', result)

    if (result.error) {
      if (result.status === 404) {
        setUnknownAirport(true)
        setLoading(false)
      } else {
        setErrored(true)
        setLoading(false)
      }
      return
    }

    setData(result.data)
    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (errored) {
    return <ErrorDialog />
  }

  if (unknownAirport) {
    return (
      <section className='detail-container'>
        <h1 className='detail__title'>Unknown airport</h1>
      </section>
    )
  }

  if (!Object.keys(data).length) return null

  return (
    <section className='detail-container'>
      <h1 className='detail__title'>{data.airportInfo.name} ({data.airportInfo.country})</h1>
      <h2 className='detail__subtitle'>{data.airportInfo.identifier}/{data.airportInfo.iataCode}</h2>
      <p>Elevation: {data.airportInfo.elevation}ft</p>
      <Divider />
      {
        data.weather && (
          <div>
            <section className='detail-section'>
              <h1 className='detail-section__title'>Weather</h1>
              <p>
                {data.weather.metar} <br />
                <span className='italic'>{data.weather.summary}.</span>
              </p>
            </section>
            <Divider />
          </div>
        )
      }
      <section className='detail-section'>
        <h1 className='detail-section__title'>Runways</h1>
        {
          data.airportInfo.runways && data.airportInfo.runways.map((runway, index) => {
            return (
              <div key={index}>
                <h2 className='detail-section__subtitle'>{runway.leIdent}/{runway.heIdent}</h2>
                <p>
                  Dimensions: {runway.length}ft x {runway.width}ft<br />
                  Surface: {runway.surface}
                </p>
              </div>
            )
          })
        }
      </section>
      <Divider />
      <section className='detail-section'>
        <h1 className='detail-section__title'>Frequencies</h1>
        {
          data.airportInfo.frequencies && data.airportInfo.frequencies.map(({ type, frequency }, index) => {
            return (
              <div key={index}>
                <h2 className='detail-section__subtitle'>{type}</h2>
                <p>
                  Frequency: {frequency}
                </p>
              </div>
            )
          })
        }
      </section>
      <Divider />
    </section>
  )
}

export default Detail

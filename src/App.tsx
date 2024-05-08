import { useEffect, useState } from 'react'
import './App.css'
import ApexCharts from 'apexcharts'
import { UrlQueryHandler } from './UrlQueryHandler'
import icon from '/bar-chart.png'

const createUsageWarning = (): JSX.Element => {
  const exampleOptions = `const options = {
  chart: {
    type: 'line'
  },
  series: [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997,1998,1999]
  }

  const encodedOptions = encodeURIComponent(JSON.stringify(options))

  const style = {
    width: 'min(500px, 100svw)',
    margin: '20px auto'
  }

  const encodedStyle = encodeURIComponent(JSON.stringify(style))

  const encodedOptions = encodeURIComponent(JSON.stringify(options))

  const style = {
    width: 'min(500px, 100svw)',
    margin: '20px auto'
  }
  
  const encodedStyle = encodeURIComponent(JSON.stringify(style))
}`;
  return <div className='usage-warning'>
    <h2>Usage</h2>
    <h3>Query params</h3>
    <ul>
      <li><strong>options: </strong>an <a href='https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp'>encoded</a> <a href='https://apexcharts.com/docs/creating-first-javascript-chart/'>apex chart option</a></li>
      <li><strong>style: </strong>an <a href='https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp'>encoded</a> css style for the chart #root element</li>
    </ul>
    <h3>
      Example
    </h3>
    <pre>
      <code>
        {exampleOptions}
      </code>
      <br></br>
      <code>
        const url = <a href="/chart-plotter?options=%7B%22chart%22%3A%7B%22type%22%3A%22line%22%7D%2C%22series%22%3A%5B%7B%22name%22%3A%22sales%22%2C%22data%22%3A%5B30%2C40%2C35%2C50%2C49%2C60%2C70%2C91%2C125%5D%7D%5D%2C%22xaxis%22%3A%7B%22categories%22%3A%5B1991%2C1992%2C1993%2C1994%2C1995%2C1996%2C1997%2C1998%2C1999%5D%7D%7D&style=%7B%22width%22%3A%22min(500px%2C%20100svw)%22%2C%22margin%22%3A%2220px%20auto%22%7D"
          className='url-example'>{`virgs.github.io/chart-plotter?options=\${encodedOptions}&style=\${encodedStyle}\``}</a>
      </code>
    </pre>

  </div>
}
const getUrlQuery = (queryName: string): object | undefined => {
  const value = new UrlQueryHandler().getParameterByName(queryName)
  try {
    if (value) {
      const parsed = JSON.parse(value)
      console.log(queryName, value)
      return parsed
    }
  } catch (err) {
    console.error(`Invalid url query '${queryName}': ${value}`, err)
  }
  return undefined
}

const urlStyle = getUrlQuery('style')
const urlOtions = getUrlQuery('options')

export const App = (): JSX.Element => {
  const [options, setOptions] = useState(urlOtions)
  const [style] = useState(urlStyle ?? {})

  useEffect(() => {
    if (options) {
      try {
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      } catch (err) {
        console.log(`Wrong 'options' usage: ${options}`)
        console.error(err)
        setOptions(undefined)
      }
    }
  }, [])

  return (
    <>
      <div className='header'>
        <a className='title-container' href='/'>
          <img className='logo' src={icon} alt='logo'></img>
          <h1 className='title'>Chart Plotter</h1>
        </a>
        <div className='horizontal-bar'></div>
      </div>
      {options ? <div id='chart' style={style}></div> : createUsageWarning()}

    </>
  )
}
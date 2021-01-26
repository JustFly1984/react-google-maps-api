import * as React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Card from '../components/card'

function NotFoundPage() {
  return (
    <Layout>
      <Card>
        <div className='text-center'>
          <div className='display-1 mt-4 mb-2'>404</div>
          <h1 className='h4 mb-3'>PAGE NOT FOUND</h1>
          <p className='text-secondary'>
            You just hit a route that doesn&#39;t exist... the sadness.
          </p>

          <Link to='/' className='btn btn-primary mt-4 mb-5'>
            Go To Homepage
          </Link>
        </div>
      </Card>
    </Layout>
  )
}

export default React.memo(NotFoundPage)

// eslint-disable-next-line filenames/match-exported
import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Footer from '../components/footer'

const NotFoundPage = () => (
  <Layout>
    <div className='container'>
      <div className='card shadow-sm'>
        <div className='card-body text-center'>
          <div className='display-1 mt-4 mb-2'>404</div>
          <h1 className='h4 mb-3'>PAGE NOT FOUND</h1>
          <p className='text-secondary'>You just hit a route that doesn&#39;t exist... the sadness.</p>

          <Link to='/' className='btn btn-primary mt-4 mb-5'>
            Go To Homepage
          </Link>
        </div>
      </div>
    </div>

    <Footer />
  </Layout>
)

export default NotFoundPage

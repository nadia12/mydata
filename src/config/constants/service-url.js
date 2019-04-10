import Hostname from './hostname'

const getDefaultValue = type => {
  const defaultEnv = {
    production: {
      BASE_URL: 'http://iq.volantis.io',
      HOST_SERVICE: 'http://iq.volantis.io/api',
      API_MANAGEMENT: 'http://iq.volantis.io',
      PIPELINE: 'http://iq.volantis.io/v1/pipeline',
      TOP_LEVEL_DOMAIN: '',
      XPLORER: 'http://iq-xplorer.volantis.io',
      ML_STUDIO: 'http://iq-mlstudio.volantis.io/create',
      MARKETPLACE_API: 'https://service.volantis.io/api',
    },
    development: {
      BASE_URL: 'http://staging-iq-app.volantis.io:18000',
      HOST_SERVICE: 'http://staging-iq-app.volantis.io:18000/api',
      API_MANAGEMENT: 'http://178.128.24.43:31097',
      // BASE_URL: 'http://iq.volantis.io',
      // HOST_SERVICE: 'http://iq.volantis.io/api',
      // API_MANAGEMENT: 'http://iq.volantis.io',
      PIPELINE: 'http://staging-iq-app.volantis.io/v1/pipeline',
      TOP_LEVEL_DOMAIN: '',
      XPLORER: 'http://staging-iq-xplorer.volantis.io',
      ML_STUDIO: 'http://staging-iq-mlstudio.volantis.io/create',
      MARKETPLACE_API: 'http://uat-service.volantis.io/api',
    },
  }

  return defaultEnv[type] || defaultEnv.development
}

export const getServicesURL = env => {
  const defaultEnv = getDefaultValue('production')

  return {
    [Hostname.root]: process.env.BASE_URL || defaultEnv.BASE_URL,
    [Hostname.web]: process.env.HOST_SERVICE || defaultEnv.HOST_SERVICE,
    [Hostname.apiManagement]: process.env.BASE_URL || defaultEnv.API_MANAGEMENT,
    [Hostname.pipeline]: process.env.PIPELINE || defaultEnv.PIPELINE,
    [Hostname.topLevelDomain]: process.env.TOP_LEVEL_DOMAIN || defaultEnv.TOP_LEVEL_DOMAIN,
    [Hostname.xplorer]: process.env.XPLORER || defaultEnv.XPLORER,
    [Hostname.mlStudio]: process.env.ML_STUDIO || defaultEnv.ML_STUDIO,
    [Hostname.marketplace]: process.env.MARKETPLACE_API || defaultEnv.MARKETPLACE_API,
  }
}

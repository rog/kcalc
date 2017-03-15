// These are the pages we can go to.
// They are all wrapped in the App component, which should contain the navbar etc

import { getAsyncInjectors } from 'utils/asyncInjectors'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err)
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes (store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store)
  if (!sessionStorage.jwt) {
    sessionStorage.jwt = false
  }

  return [
    {
      path: '/',
      name: 'home',
      onEnter (nextState, replace) {
        if (JSON.parse(sessionStorage.jwt.toLowerCase()) === false) {
          replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
          })
        }
      },
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          import('containers/Home')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '/meal/add',
      name: 'addMeal',
      action: 'add',
      onEnter (nextState, replace) {
        if (JSON.parse(sessionStorage.jwt.toLowerCase()) === false) {
          replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
          })
        }
      },
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '/meal/edit',
      name: 'editMeal',
      action: 'edit',
      onEnter (nextState, replace) {
        if (JSON.parse(sessionStorage.jwt.toLowerCase()) === false) {
          replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
          })
        }
      },
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '/login',
      name: 'login',
      onEnter (nextState, replace) {
        if (JSON.parse(sessionStorage.jwt.toLowerCase()) === true) {
          replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
          })
        }
      },
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/reducer'),
          import('containers/Login')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('login', reducer.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '/signup',
      name: 'signup',
      onEnter (nextState, replace) {
        if (JSON.parse(sessionStorage.jwt.toLowerCase()) === true) {
          replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
          })
        }
      },
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/reducer'),
          import('containers/Login')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('login', reducer.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '*',
      name: 'notfound',
      getComponent (nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }
  ]
}

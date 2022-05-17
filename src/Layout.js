import Footer from './Footer'
import Nav from './Nav'

export default function Layout({children}) {
  return (
    <>
      <Nav />
      <div style={{backgroundColor: '#f1f1f1'}}>
        {children}
      </div>
      <Footer />
    </>
  )
}


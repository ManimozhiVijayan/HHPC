import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const NotFoundPage = () => {
  return (
    <div className="page">
      <Card title="404 - Page Not Found">
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>You may have mistyped the address or the page may have moved.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default NotFoundPage

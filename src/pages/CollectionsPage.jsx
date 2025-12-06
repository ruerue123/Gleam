import Collections from '../components/Collections'

function CollectionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Collections</h1>
        <Collections />
      </div>
    </div>
  )
}

export default CollectionsPage

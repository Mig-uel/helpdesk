import Navbar from '../components/navbar/navbar.component'

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default DashboardLayout

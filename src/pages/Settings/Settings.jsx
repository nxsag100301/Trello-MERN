import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SecurityTab from './SecurityTab'
import AccountTab from './AccountTab'
import AppBar from '~/components/AppBar/AppBar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SecurityIcon from '@mui/icons-material/Security'

const TABS = {
  ACCOUNT: 'account',
  SECURITY: 'security'
}

const Settings = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getDefaultTab = () => {
    if (location.pathname.includes(TABS.SECURITY)) return TABS.SECURITY
    return TABS.ACCOUNT
  }
  useEffect(() => {
    if (!location.pathname.includes(TABS.SECURITY)) {
      setActiveTab(TABS.ACCOUNT)
    } else {
      setActiveTab(TABS.SECURITY)
    }
  }, [location.pathname])
  const [activeTab, setActiveTab] = useState(getDefaultTab())

  const handleChangeTab = (event, selectedTab) => {
    setActiveTab(selectedTab)
    navigate(`/settings/${selectedTab}`)
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingX: 2
        }}
      >
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label='Settings tabs'>
              <Tab
                label='Account'
                icon={<AccountCircleIcon />}
                iconPosition='start'
                value={TABS.ACCOUNT}
              />
              <Tab
                label='Security'
                icon={<SecurityIcon />}
                iconPosition='start'
                value={TABS.SECURITY}
              />
            </TabList>
          </Box>
          <TabPanel value={TABS.ACCOUNT}>
            <AccountTab />
          </TabPanel>
          <TabPanel value={TABS.SECURITY}>
            <SecurityTab />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}

export default Settings

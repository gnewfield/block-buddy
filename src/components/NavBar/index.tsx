import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import Web3Status from 'components/Web3Status'
import { chainIdToBackendName } from 'graphql/data/util'
import { useIsNftPage } from 'hooks/useIsNftPage'
import { Box } from 'nft/components/Box'
import { Row } from 'nft/components/Flex'
import { useProfilePageState } from 'nft/hooks'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { BREAKPOINTS } from 'theme'

import BlockBuddyLogo from '../../assets/images/block-buddy-logo-white.png'
import { ChainSelector } from './ChainSelector'
import * as styles from './style.css'

const Nav = styled.nav`
  padding: 20px 12px;
  width: 100%;
  height: ${({ theme }) => theme.navHeight}px;
  z-index: 2;
  background: ${({ theme }) => theme.accentAction};
`

interface MenuItemProps {
  href: string
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
  dataTestId?: string
}

const MenuItem = ({ href, dataTestId, id, isActive, children }: MenuItemProps) => {
  return (
    <NavLink
      to={href}
      className={isActive ? styles.activeMenuItem : styles.menuItem}
      id={id}
      style={{ textDecoration: 'none' }}
      data-testid={dataTestId}
    >
      {children}
    </NavLink>
  )
}

const PageTabs = () => {
  const { pathname } = useLocation()
  const { chainId: connectedChainId } = useWeb3React()
  const chainName = chainIdToBackendName(connectedChainId)

  return (
    <>
      <MenuItem href="/swap" isActive={pathname.startsWith('/swap')}>
        <Trans>Home</Trans>
      </MenuItem>
      <MenuItem href={`/tokens/${chainName.toLowerCase()}`} isActive={pathname.startsWith('/tokens')}>
        <Trans>My NFTs</Trans>
      </MenuItem>
      <MenuItem dataTestId="nft-nav" href="/nfts">
        <Trans>Me</Trans>
      </MenuItem>
      <MenuItem href="/pools">
        <Trans>About</Trans>
      </MenuItem>
    </>
  )
}

const Logo = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 8px;
`

const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.backgroundInteractive};
  border-radius: 9999px;
`
const Title = styled.h1`
  display: none;
  color: white;

  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    font-size: 48px;
    display: flex;
  }
`

const Navbar = () => {
  const isNftPage = useIsNftPage()
  const sellPageState = useProfilePageState((state) => state.state)
  const navigate = useNavigate()

  return (
    <>
      <Nav>
        <Box display="flex" height="full" flexWrap="nowrap">
          <Box className={styles.leftSideContainer}>
            <Box className={styles.logoContainer}>
              {/* <BlockBuddyIcon
                width="48"
                height="48"
                data-testid="uniswap-logo"
                className={styles.logo}
                // onClick={() => {
                //   navigate({
                //     pathname: '/',
                //     search: '?intro=true',
                //   })
                // }}
              /> */}
              {/* <BlockBuddyLogo /> */}
              <Row>
                <Logo src={BlockBuddyLogo} alt="BlockBuddy logo" />
                {/* <Title>BlockBuddy</Title> */}
              </Row>
            </Box>
            <Row gap={{ xl: '0', xxl: '8' }} display={{ sm: 'none', lg: 'flex' }}>
              <PageTabs />
            </Row>
          </Box>
          {/* <Box className={styles.searchContainer}>
            <SearchBar />
          </Box> */}
          <Box className={styles.rightSideContainer}>
            <Row gap="12">
              <StyledBox>
                <ChainSelector leftAlign={true} />
              </StyledBox>
              {/* <Box position="relative" display={{ sm: 'flex', xl: 'none' }}>
                <SearchBar />
              </Box>
              <Box display={{ sm: 'none', lg: 'flex' }}>
                <MenuDropdown />
              </Box> */}
              <Web3Status />
            </Row>
          </Box>
        </Box>
      </Nav>
    </>
  )
}

export default Navbar

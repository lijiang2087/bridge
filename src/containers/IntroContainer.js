import React from 'react';
import { withStore } from '@spyna/react-store'
import { withStyles } from '@material-ui/styles';
import theme from '../theme/theme'
import classNames from 'classnames'
import DetectNetwork from "web3-detect-network";
import { initLocalWeb3 } from '../utils/walletUtils'
import { removeTx } from '../utils/txUtils'

import Web3 from "web3";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MetaMask from '../assets/metamask-intro.svg'
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
    container: {
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        }
    },
    title: {
        marginBottom: theme.spacing(3),
        fontSize: 48,
        color: '#3F3F48',
        [theme.breakpoints.down('sm')]: {
            fontSize: 24
        }
    },
    metamask: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(3),
        '& img': {
            width: 92,
            height: 'auto',
        }
    },
    message: {
        // marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
    },
    button: {
        width: '100%',
        maxWidth: 230,
        // display: 'flex',
        // alignItems: 'center'
    },
    error: {
        marginTop: theme.spacing(2),
        color: '#FF4545'
    },
    info: {
        marginTop: theme.spacing(2),
    },
    info2: {
        fontWeight: 'bold',
        color: '#3F3F48'
    },
    spinner: {
        position: 'relative',
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0.5),
        width: 18,
    },
    spinnerTop: {
        color: '#eee',
    },
    spinnerBottom: {
        color: '#a4a4a4',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    disclosure: {
        width: '100%',
        maxWidth: 370,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        boxShadow: '0px 1px 2px rgba(0, 27, 58, 0.05)',
        padding: theme.spacing(2),
        color: theme.palette.primary.main,
        border: '1px solid ' + theme.palette.primary.main,
        fontSize: 12,
        lineHeight: '17px',
        borderRadius: 4,
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
    }
})

class IntroContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    goBack() {
        const { store } = this.props

        store.set('showGatewayModal', false)
        store.set('gatewayModalTx', null)
    }

    render() {
        const {
            classes,
            store
        } = this.props

        const requesting = store.get('spaceRequesting')
        const error = store.get('spaceError')
        const box = store.get('box')

        let text = 'Connect wallet'
        if (requesting) {
            if (!box) {
                text = 'Connecting to 3box'
            } else {
                text = 'Loading data'
            }
        }

        return <React.Fragment>
            {/*<Grid container>
              <div className={classes.disclosure}>
                  <Typography variant='p'>
                      RenBridge is currently down for maintenance. Please check back again&nbsp;later.
                  </Typography>
              </div>
            </Grid>*/}
            <div className={classes.container}>
                <Typography className={classes.title} variant='h2'>
                    Bitcoin, Zcash and Bitcoin Cash on&nbsp;Ethereum.
                </Typography>
                <Typography className={classes.subtitle} variant='p'>
                    The safe, fast and most secure way to bring cross-chain assets to&nbsp;Ethereum.
                </Typography>
                <Grid className={classes.metamask} container justify='center'>
                    <img src={MetaMask} />
                </Grid>
                <Grid container justify='center'>
                    <Typography className={classes.message} variant='p'>
                        To mint or release assets, connect your&nbsp;wallet.
                    </Typography>
                </Grid>
                <Grid container justify='flex-start' direction='column' alignItems='center'>
                    <Button onClick={() => {
                            initLocalWeb3('injected')
                        }}
                        disabled={requesting}
                        className={classes.button}
                        size='large'
                        color='primary'
                        disableRipple
                        variant='contained'>
                        {requesting && <div className={classes.spinner}>
                              <CircularProgress
                                variant="determinate"
                                value={100}
                                className={classes.spinnerTop}
                                size={18}
                                thickness={4}
                              />
                              <CircularProgress
                                variant="indeterminate"
                                disableShrink
                                className={classes.spinnerBottom}
                                size={18}
                                thickness={4}
                              />
                        </div>}
                        {text}
                    </Button>
                    {!requesting && error && <Typography variant='caption' className={classes.error}>
                        Connection failed. Please note: hardware wallets are not supported at this&nbsp;time.
                    </Typography>}
                    {requesting && <React.Fragment>
                      <Typography variant='caption' className={classes.info}>
                          Connecting to decentalized storage, this may take a minute.
                      </Typography>
                      <Typography variant='caption' className={classes.info2}>
                          Please approve any 3box messages that appear in your wallet.
                      </Typography>
                    </React.Fragment>}
                </Grid>
            </div>
        </React.Fragment>
    }
}

export default withStyles(styles)(withStore(IntroContainer))

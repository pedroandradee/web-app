import React, { Component } from 'react'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withTranslation, WithTranslation } from 'react-i18next';
import { Protocol } from '../../store/application/models/protocol/protocol';

interface IProps extends WithTranslation {
    readonly protocol: Protocol
    readonly loading: boolean
}

class ProtocolHeaderComponent extends Component<IProps> {

    public render() {
        const {
            t,
            protocol,
            loading
        } = this.props

        return <Box
            display="flex"
            justifyContent="start"
            alignItems="center"
            flex={1}>
            <Box
                display="flex"
                width="100%"
                flexGrow={loading ? 1 : undefined}
                justifyContent="start"
                flexWrap="wrap">
                
                <Box 
                    display="flex"
                    flexGrow={1}
                    flexWrap="wrap"
                    justifyContent="space-between"
                    p={1}>
                    <Box flexGrow={1} p={.5}>
                        <Box pb={.5}>
                            {
                                loading ?
                                <Skeleton variant="rect" width="80%" height={20}/>
                                : <Typography variant="body1">
                                    {t('PROTOCOLS.DATA.HEADER.CONTRIBUTOR')}: <b>{ protocol.name || ' - - ' }</b>
                                </Typography>
                            }
                        </Box>
                        <Box>
                            {
                                loading ?
                                <Skeleton variant="rect" width="80%" height={20}/>
                                : <Typography>
                                    {t('PROTOCOLS.DATA.HEADER.INCLUSION_REQUEST')}: <b>{ protocol.issue_date || ' - - ' }</b>
                                </Typography>
                            }
                        </Box>
                    </Box>

                    <Box flexGrow={1} p={.5}>
                        <Box pb={.5}>
                            {
                                loading ?
                                <Skeleton variant="rect" width="80%" height={20}/>
                                : <Typography>
                                    {t('PROTOCOLS.DATA.HEADER.REFERENCE_MONTH')}: <b>{ protocol.issue_date || ' - - ' }</b>
                                </Typography>
                            }
                        </Box>
                        <Box>
                            {
                                loading ?
                                <Skeleton variant="rect" width="80%" height={20}/>
                                : <Typography>
                                    {t('PROTOCOLS.DATA.HEADER.SITUATION')}: <b>{ protocol.status_av || ' - - ' }</b>
                                </Typography>
                            }
                        </Box>
                    </Box>
                </Box>
                

            </Box>
        </Box>
    }
}

const ProtocolHeader = withTranslation()(ProtocolHeaderComponent)

export default ProtocolHeader
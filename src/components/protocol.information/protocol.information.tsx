import React, { Component } from 'react'
import {
    Box,
    createStyles,
    InputAdornment,
    TextField,
    Theme,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import { ANIMATION, TABLES } from '../../material.theme'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Protocol } from '../../store/application/models/protocol/protocol'
import { IPaginator, ISearch } from '../../store/ducks/root.types'
import clsx from 'clsx'
import Cell from '../table.utils/cell'
import TableLoading from '../loading'
import TableEmpty from '../table.utils/table.empty'
import { ReactComponent as DocumentNotFound } from '../../assets/imgs/icons/custom/doc-not-found.svg'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { ContactlessOutlined, Search } from '@material-ui/icons'

const Style = (theme: Theme) => createStyles({
    ...ANIMATION,
    ...TABLES(theme),
    paper: {
        width: '100%',
        padding: theme.spacing(1)
    },
    spacingBtn: {
        margin: `0px ${theme.spacing(2)}px 0px 0px`
    },
    spacingChip: {
        margin: `0px ${theme.spacing(1)}px`
    },
    styleRow: {
        cursor: 'pointer'
    }
})

interface IProps extends RouteComponentProps {
   // readonly protocol: Protocol
    readonly loading: boolean

}

type IJoinProps = IProps & WithTranslation & WithStyles<typeof Style>

class InfoProtocolComponent extends Component<IJoinProps> {

    constructor(props: IJoinProps) {
        super(props)

        /* Bind Context */
       //  this.loadProtocol = this.loadProtocol.bind(this)

    }

    /**
     * It is invoked immediately after a component is assembled (inserted into the tree).
     * @public
     * @see {@link https://pt-br.reactjs.org/docs/react-component.html#componentdidmount}
     * @returns {void}
     */
    public componentDidMount(): void {
        const {
            match: { params },
            // protocol,
            // findRequest
        } = this.props
     // this.loadProtocol()
    }

    public render() {
        const {
            t,
            classes,
           // protocol,
            
            loading
        } = this.props
        return  <Box marginX={1}>
            <Box
                    display="flex"
                    justifyContent="space-between" 
                    alignItems="flex-end"
                    marginLeft={1}
                    marginRight={1}>
            
                    <Box p={1}>
                            <Typography>
                                <b> Contribuente:</b>
                            </Typography>
                            <Typography>
                                <b>Pedido de inclusão :</b>
                            </Typography>
                        </Box>
                    <Box p={0.5}>
                        <Typography>
                            <b>Mes referencia:</b>
                        </Typography>
                        <Typography>
                            <b>Situação: </b>
                        </Typography>
                    </Box>
     
                    <Box display="flex">
                        <TextField
                            id="search-text"
                            placeholder="Pesquisa"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => {

                                console.log(e)
                            }}
                        />
                    </Box>
                </Box>
 
</Box>
            
             
    }

   /* private loadProtocol(): void {
        const {
            match: { params }
            // protocol,
            // loadProtocolItems
        } = this.props
        console.log(params)
        console.log("loading protocol items")
    
    }*/
}

const InfoProtocolWithTranslation = withTranslation()(InfoProtocolComponent)

const InfoProtocols = withRouter(withStyles<any>(Style)(InfoProtocolWithTranslation))

export default InfoProtocols
import React, { Component } from 'react'

/**
 * @private
 * @property {number} [value] Numeric value to be formatted for the pt-BR locale
 * @property {number} [maximumFractionDigits] Maximum number of decimal places
 */
interface IProps {
    readonly value?: number
    readonly minimumFractionDigits?: number
    readonly maximumFractionDigits?: number
}

/**
 * Component to formats any value to money format pt-BR.
 *
 * @property {number} value Numeric value to be formatted for the pt-BR locale
 * @property {number} [maximumFractionDigits] Maximum number of decimal places
 * @component
 * @category Components
 *
 */
export default class FormatCurrency extends Component<IProps> {
    public static format(value?: number, minimumFractionDigits?: number, maximumFractionDigits?: number): string {
        const valueFormatted: string | undefined = value?.toLocaleString('pt', {
            currency: 'BRL',
            minimumFractionDigits: minimumFractionDigits !== undefined ? minimumFractionDigits : 2,
            maximumFractionDigits: maximumFractionDigits !== undefined ? maximumFractionDigits : 2
        })
        if (!value || !valueFormatted || valueFormatted === '0' || valueFormatted === '-0') {
            return ` - - `
        }
        return `R$ ${valueFormatted}`
    }

    constructor(props: IProps) {
        super(props)
        FormatCurrency.format = FormatCurrency.format.bind(this)
    }


    /**
     * Render method.
     * Triggering method to render the component.
     * @return {JSX.Element} Component to be rendered.
     */
    public render(): JSX.Element {
        const { value, minimumFractionDigits, maximumFractionDigits } = this.props
        const valueFormatted: string = FormatCurrency.format(value, minimumFractionDigits, maximumFractionDigits)
        return <React.Fragment>{valueFormatted}</React.Fragment>
    }
}

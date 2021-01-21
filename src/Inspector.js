const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, RangeControl } = wp.components;

export default class Inspector extends Component {
	render() {
		const { events = [], numEvents } = this.props.attributes;
		const { setAttributes } = this.props;

		const onChangeNumEvents = ( value ) => {
			let newEvents = [ ...events ];
			if ( value < events.length ) {
				newEvents = events.slice( 0, value );
			} else {
				const eventDiff = value - events.length;
				for ( let count = 0; count < eventDiff; count++ ) {
					newEvents.push( {
						event: undefined,
						description: undefined,
					} );
				}
			}
			setAttributes( { events: newEvents, numEvents: value } );
		};
		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Timeline Options', 'mark-tate' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Number of events', 'mark-tate' ) }
						value={ numEvents }
						onChange={ onChangeNumEvents }
						min={ 1 }
						step={ 1 }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

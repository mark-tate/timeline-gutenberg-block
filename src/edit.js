import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import Inspector from './inspector';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
const { __ } = wp.i18n;

function VerticalTimelineElementWrapper( props ) {
	const { description, event, onChange } = props;
	const handleEventChange = ( value ) => {
		onChange( { event: value, description } );
	};
	const handleDescriptionChange = ( value ) => {
		onChange( { event, description: value } );
	};

	return (
		<VerticalTimelineElement
			contentStyle={ {
				background: 'rgb(33, 150, 243)',
				color: '#fff',
			} }
			contentArrowStyle={ {
				borderRight: '7px solid  rgb(33, 150, 243)',
			} }
			date={ event }
			iconStyle={ {
				background: 'rgb(33, 150, 243)',
				boxShadow:
					'0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
			} }
		>
			<RichText
				tagName="p"
				placeholder={ __( 'Enter Event Date', 'mark-tate' ) }
				value={ event }
				className="wp-mark-tate-timeline-event"
				onChange={ handleEventChange }
			/>
			<RichText
				tagName="p"
				placeholder={ __( 'Enter Description', 'mark-tate' ) }
				value={ description }
				className="wp-mark-tate-timeline-description"
				onChange={ handleDescriptionChange }
			/>
		</VerticalTimelineElement>
	);
}

function VerticalTimelineWrapper( { clientId, events = [], onEventsChange } ) {
	const handleEventChange = ( value, index ) => {
		const newEvents = [ ...events ];
		newEvents[ index ] = value;
		onEventsChange( newEvents );
	};
	return (
		<VerticalTimeline>
			{ events.map( ( event, index ) => (
				<VerticalTimelineElementWrapper
					key={ 'wp-mark-tate-timeline-event-' + clientId }
					{ ...event }
					onChange={ ( value ) => handleEventChange( value, index ) }
				/>
			) ) }
		</VerticalTimeline>
	);
}

export default class Edit extends Component {
	render() {
		const handleEventsChange = ( value ) => {
			this.props.setAttributes( { events: value } );
		};
		return [
			// Add an Inspector to add controls to the right hand panel
			<Inspector
				key={ 'wp-mark-tate-inspector-' + this.props.clientId }
				{ ...this.props }
			/>,
			// The number of events is controlled by the Inspector attributes
			<VerticalTimelineWrapper
				key={ 'wp-mark-tate-timeline-wrapper-' + this.props.clientId }
				events={ this.props.attributes.events }
				onEventsChange={ handleEventsChange }
			/>,
		];
	}
}

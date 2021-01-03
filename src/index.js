import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

registerBlockType( 'mark-tate/timeline-block', {
	title: __( 'Timeline', 'mark-tate' ),
	icon: 'index-card',
	category: 'layout',
	attributes: {
		events: {
			type: 'array',
			source: 'children',
			selector: '.event',
		},
	},
	example: {
		attributes: {
			events: [
				'01/01/21 Created my first event',
				'01/03/21 Created my second event',
				'01/06/21 Created my third event',
				'01/12/21 Created my third event',
			],
		},
	},
	edit: ( props ) => {
		const {
			className,
			attributes: { events },
			setAttributes,
		} = props;
		const onChangeEvent = ( value ) => {
			setAttributes( { events: value } );
		};
		return (
			<div className={ className }>
				<h5>Event Details</h5>
				<RichText
					tagName="ul"
					multiline="li"
					placeholder="DD/MM/YYYY description"
					value={ events }
					onChange={ onChangeEvent }
					className="event"
				/>
			</div>
		);
	},
	save: ( props ) => {
		const {
			attributes: { events },
		} = props;
		const timelineChildren = events.map( ( event ) => {
			const splitRegExp = new RegExp( /(\S+)(.*)/ );
			const matches = splitRegExp.exec( event.props.children );
			return `<VerticalTimelineElement
                    date="${ matches[ 1 ] }"
                    iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}
                >
                    <h3>${ matches[ 2 ] }</h3>
                </VerticalTimelineElement>`;
		} );
		return wp.element.RawHTML( {
			children: `
                <VerticalTimeline>
                    ${ timelineChildren.join( '' ) }
                </VerticalTimeline> `,
		} );
	},
} );

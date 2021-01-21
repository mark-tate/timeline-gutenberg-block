import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './Edit';
import Save from './Save';

registerBlockType( 'mark-tate/timeline-block', {
	title: __( 'Timeline', 'mark-tate' ),
	icon: 'index-card',
	category: 'layout',
	attributes: {
		events: {
			type: 'array',
			default: [ { event: undefined, description: undefined } ],
		},
		numEvents: {
			type: 'number',
			default: 0,
		},
	},
	edit: ( props ) => <Edit { ...props } />,
	save: ( props ) => <Save { ...props } />,
} );

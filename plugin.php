<?php

defined( 'ABSPATH' ) || exit;

function timeline_block() {

	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'timeline',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'timeline-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	register_block_type( 'mark-tate/timeline-block', array(
		'editor_style' => 'timeline-editor',
		'editor_script' => 'timeline',
	) );
}
add_action( 'init', 'timeline_block' );

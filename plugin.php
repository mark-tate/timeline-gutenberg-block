<?php

/**
 * Plugin Name: Mark Tate - Timeline Block
 * Description: Timeline UI Component
 * Version: 0.0.1
 */
 
defined( 'ABSPATH' ) || exit;

function timeline_block() {

	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    /** Register timeline block */
	wp_register_script(
		'timeline',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

    /** Register timeline block editor styles */
	wp_register_style(
		'timeline-editor',
		plugins_url('src/edit.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
        1,
        'all'
	);

    /** Register `react-vertical-timeline-component` third party styles */
	wp_register_style(
		'react-vertical-timeline-component',
		plugins_url('node_modules/react-vertical-timeline-component/style.min.css', __FILE__ ),
		array(),
		1,
		'all'
	);
    wp_enqueue_style('react-vertical-timeline-component');

	register_block_type( 'mark-tate/timeline-block', array(
		'editor_style' => 'timeline-editor',
		'editor_script' => 'timeline',
	) );
}
add_action( 'init', 'timeline_block' );

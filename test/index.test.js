const fs      = require( 'fs' );
const path    = require( 'path' );
const plugin  = require( '..' );
const postcss = require( 'postcss' );

/**
 * Run unit test.
 *
 * @param {string} input css input
 * @param {string} output css output
 * @param {object} opts options from plugin settings.
 */
function run( input, output, opts ) {
    return postcss([ plugin( opts ) ]).process( input )
        .then( result => {
            expect( result.css ).toEqual( output );
            expect( result.warnings().length ).toBe( 0 );
        } );
}

/**
 * Import case css file from folder.
 *
 * @param {string} name css for inport
 */
function casesCSS( name ) {
    return fs
        .readFileSync( path.join( __dirname, 'cases', `${name}.css` ), 'utf8' )
        .trim();
}

// Runs unit test.
it( 'check output', () => {
    return run( casesCSS( 'input' ), casesCSS( 'output' ) );
} );

var postcss = require( 'postcss' );
var _       = require( 'lodash' );

var DEFAULTS = {
    base: 16,
    precision: 3,
    toEM: [
        'letter-spacing',
        'text-shadow'
    ],
    toREM: [
        'box-shadow',
        'font-size',
        'margin',
        'padding'
    ],
    ignoreList: [
        'border',
        'border-radius'
    ]
};

module.exports = postcss.plugin( 'postcss-unit-conversion', function( opts ) {

    // Get options else use defaults.
    opts = _.extend( {}, DEFAULTS, opts );

    /**
     * Parse and multiple new value.
     *
     * @param {string} value unit to be converted
     * @param {int} base dfault int base
     * @returns {int} string new unit.
     */
    function returnNewValue( value, base ) {

        value.replace( 'px', '' );

        return parseInt( value, 10 ) / base;
    }

    /**
     * Map units for conversion.
     *
     * @param {array} array array of props to convert.
     * @param {object} rule object of rules from postcss.
     * @return conversion.
     */
    function mapForConversion( array, rule ) {

      return array.map( function( type ) {

        rule.walkDecls( type, function( decl ) {

            var valueArray = decl.value.split( ' ' );

            var newValueArray = returnConverted( valueArray, 'em' );

            decl.value = newValueArray.join( ' ' );

            return decl;
        } );
      } );
    }

    /**
     * Convert units from PX to unit.
     *
     * @param {array} array array of value.
     * @param {string} unit 'em' or 'rem'
     *
     * @return {string} update values.
     */
    function returnConverted( array, unit ) {

        return array.map( function( value ) {
            if ( value.includes( 'px' ) ) {

                value = returnNewValue( value, DEFAULTS.base );

                if ( 0 !== value ) {
                    return value.toFixed( DEFAULTS.precision ) + unit;
                }

                return value;
            }

            return value;
        } );
    }

    return function( root ) {

    // Look through each selector block.
        root.walkRules( function( rule ) {

            // Convert PX to EM
            mapForConversion( DEFAULTS.toEM, rule );

            // Convert PX to REM
            mapForConversion( DEFAULTS.toREM, rule );
        } );
    };
} );

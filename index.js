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
    ]
};

module.exports = postcss.plugin( 'postcss-unit-conversion', function ( opts ) {

    /* eslint-disable */
    opts = _.extend( {}, DEFAULTS, opts );
    /* eslint-enable */

    /**
     * Parse and multiple new value.
     *
     * @param {string} value unit to be converted
     * @param {int} base dfault int base
     * @returns {int} string new unit.
     */
    function returnNewValue( value, base ) {

        // Strip px.
        value.replace( 'px', '' );

        // Return value divided by base set above.
        return parseInt( value, 10 ) / base;
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

        return array.map( function ( value ) {

            // If we start with px, let's do some math.
            if ( value.includes( 'px' ) ) {

                // Get new values based on px.
                value = returnNewValue( value, opts.base );

                // Assume we're not 0, return new value.
                if ( value !== 0 ) {
                    return value.toFixed( opts.precision ) + unit;
                }

                // Else return value.
                return value;
            }

            // Else return existing value.
            return value;
        } );
    }

    /**
     * Map units for conversion.
     *
     * @param {array} array array of props to convert.
     * @param {object} rule object of rules from postcss.
     * @return conversion.
     */
    function mapForConversion( array, rule ) {

        return array.map( function ( type ) {

            // Walk through each type added.
            rule.walkDecls( type, function ( decl ) {

                // Turn values into array.
                var valueArray = decl.value.split( ' ' );

                var newValueArray = returnConverted( valueArray, 'em' );

                // Rejoin values.
                decl.value = newValueArray.join( ' ' );

                // Return new values.
                return decl;
            } );
        } );
    }

    return function ( root ) {

        // Look through each selector block.
        root.walkRules( function () {

            // Convert PX to EM
            mapForConversion( opts.toEM, rule );

            // Convert PX to REM
            mapForConversion( opts.toREM, rule );
        } );
    };
} );

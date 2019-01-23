module.exports = {
    joulesToMegaJoules: function(joules){
        return joules / 1000000;;
    },

    megaJoulesToJoules: function(megaJoules){
        return megaJoules * 1000000;
    },

    /**
     * Taking in the mass of a projectile, and the energy imparted on that projectile, this function will return the muzzleVelocity of that projectile.
     * @param {number} mass In kilograms
     * @param {number} energy In joules
     * @param {boolean} [trim=true] Indicates whether to trim the result to two decimal points or not.
     */
    calculateProjectileVelocity: function(mass, energy, trim=true){
        let result = Math.sqrt( (2 * energy) / mass);
        if (trim){
            result = result.toFixed(2);
        }
        return result; 
    },

    metersToKilometers(meters){
        return meters / 1000;
    },

    kilometersToMeters(kilometers){
        return kilometers * 1000;
    },

    megagramsToKilograms: function(megagrams){
        return megagrams * 1000;
    },

    meganewtonToNewton: function(meganewton){
        return meganewton * 1000000;
    },
}
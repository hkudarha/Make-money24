
export function passwordValidator(password) {
    if (!password) return "Password can't be empty.";

    // Minimum length requirement
    if (password.length < 8)
        return "Password must be at least 8 characters long.";

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password))
        return "Password must contain at least one uppercase letter.";

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password))
        return "Password must contain at least one lowercase letter.";

    // Check for at least one digit
    if (!/[0-9]/.test(password))
        return "Password must contain at least one digit.";

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        return "Password must contain at least one special character.";

    return ""; // Return an empty string if all validations pass
}

// old
// export function passwordValidator(password) {
//     if (!password) return "Password can't be empty.";
//     if (password.length < 5)
//         return "Password must be at least 5 characters long.";
//     return "";
// }


export function nameValidator(name) {
    if (!name) return "Name can't be empty.";
    return "";
}


export function emailValidator(email) {
    const re = /\S+@\S+\.\S+/;
    if (!email) return "Email can't be empty.";
    if (!re.test(email)) return "Oops! We need a valid email address.";
    if (email.indexOf(" ") !== -1) return "Email cannot contain spaces.";
    return "";
}


export function phoneValidator(phone, required = true) {
    if (required && !phone) return "Phone number can't be empty.";
    const isValidPhone = /^\d{10}$/;
    if (!isValidPhone.test(phone))
        return "Please enter a valid 10-digit phone number.";
    return "";
}


export function otpValidator(otp) {
    const isValidOTP = /^\d{4}$/;
    if (!otp) return "OTP can't be empty.";
    if (!isValidOTP.test(otp)) return "OTP must be a 4-digit number.";
    return "";
}


export function fieldValidator(value, required = true) {
    if (required && !value) return "This Field can't be empty.";
    return "";
}


export function tagValidator(tags) {
    if (!tags) return "This Field can't be empty.";
    if (tags.split(",").length > 15) return "Max 15 tags allowed";
    return "";
}


export function imagesValidator(images) {
    if (
        !images.mainImage ||
        !images.leftSideImage ||
        !images.rightSideImage ||
        !images.topViewImage ||
        !images.bottomViewImage ||
        !images.backImage ||
        !images.benefitsImage ||
        !images.highlightImage ||
        !images.otherImage
    )
        return "Please upload all the images.";
    return "";
}


export function numberValidator(number, limit, required = true) {
    if (required && !number) return "This field can't be empty.";
    if (isNaN(number)) return "Please enter a valid number.";
    if (number < 0) return "This field can't be negative.";
    if (limit && number > limit) return `Number can't be more than ${limit}.`;
    return "";
}

export function pincodeValidator(pincode, required = true) {
    // Check if the pincode is required and empty
    if (required && !pincode) return "Pincode can't be empty.";

    // Ensure the pincode contains only digits and is exactly 6 digits long
    const isValidPincode = /^\d{6}$/;
    if (!/^\d+$/.test(pincode))
        return "Pincode must contain only numeric digits.";
    if (!isValidPincode.test(pincode))
        return "Please enter a valid 6-digit pincode.";

    return ""; // Return an empty string if all validations pass
}

export function gstValidator(gstNumber) {
    // Check if the GST number is provided
    if (!gstNumber) return "GST number can't be empty.";

    // Define the regex pattern for GST validation
    // Example: 12ABCDE1234F1Z5
    const gstPattern =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z][A-Z0-9]{1}$/;

    // Test the GST number against the pattern
    if (!gstPattern.test(gstNumber)) {
        return "Please enter a valid GST number.";
    }

    return ""; // Return an empty string if all validations pass
}

export function panValidator(panNumber) {
    // Check if the PAN number is provided
    if (typeof panNumber !== "string" || !panNumber.trim()) {
        return "PAN number can't be empty.";
    }

    // Trim any extra spaces around the PAN number
    panNumber = panNumber.trim();

    // Define the regex pattern for PAN validation
    // Example: ABCDE1234F
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    // Test the PAN number against the pattern
    if (!panPattern.test(panNumber)) {
        return "Please enter a valid PAN number.";
    }

    return ""; // Return an empty string if all validations pass
}

export function ifscValidator(ifsc) {
    // Check if the IFSC code is provided
    if (!ifsc) return "IFSC code can't be empty.";

    // Define the regex pattern for IFSC code validation
    // Allows digits in the branch code
    const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    // Test the IFSC code against the pattern
    if (!ifscPattern.test(ifsc)) {
        return "Please enter a valid IFSC code.";
    }

    return ""; // Return an empty string if all validations pass
}

export function validateLatitude(latitude) {
    // Check if latitude is provided
    if (latitude === undefined || latitude === '') {
        return "Latitude can't be empty.";
    }

    // Check if the input is a valid number
    const lat = parseFloat(latitude);
    if (isNaN(lat)) {
        return "Latitude must be a number.";
    }

    // Validate if the number is within the valid latitude range
    if (lat < -90 || lat > 90) {
        return "Latitude must be between -90 and 90.";
    }

    // Additional check to ensure no non-numeric characters
    if (!/^-?\d*\.?\d+$/.test(latitude)) {
        return "Latitude must be a valid number (integer or float).";
    }

    return ""; // Return an empty string if all validations pass
}

export function validateLongitude(longitude) {
    // Check if longitude is provided
    if (longitude === undefined || longitude === '') {
        return "Longitude can't be empty.";
    }

    // Check if the input is a valid number
    const lon = parseFloat(longitude);
    if (isNaN(lon)) {
        return "Longitude must be a number.";
    }

    // Validate if the number is within the valid longitude range
    if (lon < -180 || lon > 180) {
        return "Longitude must be between -180 and 180.";
    }

    // Additional check to ensure no non-numeric characters
    if (!/^-?\d*\.?\d+$/.test(longitude)) {
        return "Longitude must be a valid number (integer or float).";
    }

    return ""; // Return an empty string if all validations pass
}
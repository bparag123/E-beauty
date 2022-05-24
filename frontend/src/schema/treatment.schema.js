import * as yup from "yup"

const TreatmentSchema = yup.object().shape({
    name: yup.string()
        .required('Treatment Name is Required'),
    charge: yup.number().positive("Invalid Duration").min(0.1).required("Price is Required"),
    duration: yup.number().positive("Invalid Duration").min(0.1).required("Duration is Required"),
    file: yup.mixed()
        .test({
            message: "File is Required. It Should be in PNG/JPG Format",
            test: (value) => {
                if (!value) {
                    console.log(false);
                    return false
                }
                if (value.size > 2 * 1000 * 1000) {
                    return false
                }
                const { type } = value
                if (type !== "image/png" && type !== "image/jpeg") {
                    return false
                }
                console.log("last");
                return true
            }
        })
});

export default TreatmentSchema
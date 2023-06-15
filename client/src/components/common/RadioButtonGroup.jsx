import { FormControlLabel, FormLabel, FormControl, RadioGroup, Radio } from '@mui/material';
import { useField } from 'formik';

export default function RadioButtonGroup(props) {
    const [field] = useField({
        name: props.name,
        type: 'radio',
        value: props.value,
    });

    return <FormControlLabel control={<Radio {...field} {...props} />} label={props.label} />;
}

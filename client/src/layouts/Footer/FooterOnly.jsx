import LanguageIcon from '@mui/icons-material/Language';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';
import { Wrapper, LiItem } from './FooterOnlyStyles';

const FooterOnly = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    localStorage.setItem('i18nextLng', e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  const locale = localStorage.getItem('i18nextLng');

  return (
    <Wrapper>
      <ul>
        <LiItem>
          <LanguageIcon sx={{ mr: 1 }} fontSize="medium" />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={locale}
                label="Language"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="en-US">English</MenuItem>
                <MenuItem value="vn">Vietnamese</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </LiItem>
        <li>
          <a href="#">Newsletter</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a href="#">Stores</a>
        </li>
        <li>
          <a href="#">Follow Us</a>
        </li>
        <li>
          <a href="#">Legal & Privacy</a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default FooterOnly;

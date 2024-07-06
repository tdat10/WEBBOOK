import { forwardRef, useState, useEffect } from 'react';
import {
  Grid, Select, Button, MenuItem, TextField, FormLabel,
  FormControl, CardContent, Typography, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />;
});

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 0),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1, 0),
}));

const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '16px'
}));

const BASE_URL = 'http://127.0.0.1:8080/api';

const AddBook = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [file1, setFile1] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileNames, setFileNames] = useState('');
  const [fileName1, setFileName1] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchGenres = fetch(`${BASE_URL}/genre`).then(resp => resp.json());
      const [genres] = await Promise.all([fetchGenres]);
      setGenres(genres);
    };

    fetchData();
  }, []);

  const fileOnChange = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const fileList = Array.from(files).map(file => file.name).join(', ');
      setFileNames(fileList);

      const fls = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedFiles(fls);
      setFiles(Array.from(files));
    }
  };
 
  const fileImageOnChange = (events) => {
    const { file1 } = events.target;
    if (file1 && file1.length > 0) {
      const fileList1 = Array.from(file1).map(file1 => file1.name).join(', ');
      setFileName1(fileList1);

      const imgs = Array.from(file1).map(file1 => URL.createObjectURL(file1));
      setImages(imgs);
      setFile1(Array.from(file1));
    }
  };


  const postData = async () => {
    const formData = new FormData(document.getElementById('book-form'));
    const token = localStorage.getItem('token');
    try {
      const resp = await fetch(`${BASE_URL}/book`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (resp.ok) {
        Swal.fire("Thêm thành công", "", "success");
        router.push('/admin/books');
      } else {
        const errorData = await resp.json();
        Swal.fire("Thất bại", errorData.message || "", "error");
      }
    } catch (error) {
      Swal.fire("Thất bại", "", "error");
      console.error("Lỗi:", error);
    }
  };
  
  const handleCreateBook = async () => {
    await postData();
  };

  return (
    <CardContent>
      <form id='book-form' encType='multipart/form-data'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <FormLabel>Tên chủ đề</FormLabel>
            <StyledTextField name='title' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Tác giả</FormLabel>
            <StyledTextField name='author' required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Xuất xứ</FormLabel>
            <FormControl fullWidth>
              <StyledSelect id="genre" name="genre" defaultValue="" required>
                {genres && genres.map(genre => (
                  <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Mô tả</FormLabel>
            <StyledTextField name='description' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Cấp bậc</FormLabel>
            {/* <StyledTextField type='number' name='stock' required /> */}
            <FormControl fullWidth>
              <StyledSelect id="stock" name="stock" defaultValue="" required>                
                  <MenuItem value={'Lớp 1'}> Lớp 1 </MenuItem>   
                  <MenuItem value={'Lớp 2'}> Lớp 2 </MenuItem> 
                  <MenuItem value={'Lớp 3'}> Lớp 3 </MenuItem> 
                  <MenuItem value={'Lớp 4'}> Lớp 4 </MenuItem> 
                  <MenuItem value={'Lớp 5'}> Lớp 5 </MenuItem> 
                  <MenuItem value={'Lớp 6'}> Lớp 6 </MenuItem> 
                  <MenuItem value={'Lớp 7'}> Lớp 7 </MenuItem> 
                  <MenuItem value={'Lớp 8'}> Lớp 8 </MenuItem> 
                  <MenuItem value={'Lớp 9'}> Lớp 9 </MenuItem> 
                  <MenuItem value={'Lớp 10'}> Lớp 10 </MenuItem> 
                  <MenuItem value={'Lớp 11'}> Lớp 11 </MenuItem>
                  <MenuItem value={'Lớp 12'}> Lớp 12 </MenuItem>
                  <MenuItem value={'Đại Học'}> Đại học </MenuItem>            
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Giá Sale</FormLabel>
            <StyledTextField type='number' name='salePrice' required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Giá</FormLabel>
            <StyledTextField type='number' name='price' required />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormLabel>Thời gian</FormLabel>
            <StyledInput type='date' name='publishDate' defaultValue={new Date().toISOString().slice(0, 10)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>Upload File</FormLabel>
            <StyledTextField name='publisher' value={fileNames} required />
            <ButtonStyled component='label' variant='contained' htmlFor='upload-file'>
              Chọn file
              <input
                hidden
                type='file'
                onChange={fileOnChange}
                id='upload-file'
                name='upFile'
                multiple
              />
            </ButtonStyled>
            {uploadedFiles.map((file, index) => (
              <Typography key={index}>
                <a href={`${BASE_URL}/download/${file.id}`} download>{file.name}</a>
              </Typography>
            ))}
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormLabel>soldQty</FormLabel>
            <StyledTextField name='soldQty' required />
          </Grid> */}
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            {images.map((img, index) => (
              <ImgStyled key={index} src={img} />
            ))}
            <Box>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Ảnh minh họa
                <input
                  hidden
                  type='file'
                  onChange={fileImageOnChange}
                  accept='image/png, image/jpeg'
                  id='account-settings-upload-image'
                  name='images'
                  multiple
                />
              </ButtonStyled>
              <Typography variant='body2' sx={{ marginTop: 5 }}>
                Chỉ cho phép PNG hoặc JPEG. Kích thước tối đa 800K.
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormLabel>Upload file</FormLabel>
            <StyledTextField name='uploadFileName' value={fileNames} required />
            <ButtonStyled component='label' variant='contained' htmlFor='upload-file'>
              Chọn file
              <input
                hidden
                type='file'
                onChange={fileOnChange}
                id='upload-file'
                name='upFile'
                multiple
              />
            </ButtonStyled>
            {uploadedFiles.map((file, index) => (
              <Typography key={index}>
                <a href={`${BASE_URL}/download/${file.id}`} download>{file.name}</a>
              </Typography>
            ))}
          </Grid> */}
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={postData}>
              Thêm
            </Button>
            <Button type='reset' variant='outlined' color='secondary'
              onClick={(e) => { document.getElementById('book-form').reset(); setImages([]); setFiles([]); setFileNames(''); }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default AddBook;

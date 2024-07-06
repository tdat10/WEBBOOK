import { forwardRef, useState, useEffect } from 'react';
import {
  Grid, Button, MenuItem, TextField, CardContent, FormControl, Select,
  Typography, Box, FormLabel
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

const UpdateBook = () => {
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [images, setImages] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [uploadFileName, setFileNames] = useState([]);
  const [fileName1, setFileName1] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookData, genresData] = await Promise.all([
          fetch(`${BASE_URL}/book/${router.query.id}`).then(resp => resp.json()),
          fetch(`${BASE_URL}/genre`).then(resp => resp.json())
        ]);
        
        setGenres(genresData);
        setBook(bookData);
        setImages(bookData.images || []);
        console.log(bookData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    if (router.query.id) fetchData();
  }, [router.query.id]);

  const fileUploadOnChange = async event => {
    const { files } = event.target;
    if (files && files.length >= 0) {
      const readFile = file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      }
      const fls = await Promise.all(Array.from(files).map(file => readFile(file)));
      
      //let nameFile = event.target.files[0].name
      //console.log(book)

      // setBook((prevBook) => ({
      //   ...prevBook,
      //   publisher: nameFile
      // }));
      setUploadedFiles(fls);

      //setFiles(Array.from(files));
    }
  };

  const fileOnChange = async file => {
    const { files } = file.target;
    if (files && files.length !== 0) {
      const readFile = file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      };
      const imgs = await Promise.all(Array.from(files).map(file => readFile(file)));
      setImages(imgs);
    }
  };

  const postData = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData(document.getElementById('book-form'));

    images.forEach((img, index) => {
      formData.append('images', img);
    });

    try {
      const resp = await fetch(`${BASE_URL}/book/${book.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      if (resp.ok) {
        Swal.fire("Sửa thành công", "", "success");
        router.push('/admin/books');
      } else {
        Swal.fire("Sửa thất bại", "", "error");
      }
    } catch (error) {
      Swal.fire('Sửa thất bại', '', 'error');
      console.error('Sửa thất bại', error);
    }
  };

  if (!book) {
    return <>Đang tải</>;
  }

  return (
    <CardContent>
      <form id='book-form' encType='multipart/form-data'>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormLabel>Tên chủ đề</FormLabel>
            <StyledTextField name='title' defaultValue={book.title} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <FormControl fullWidth>
              <FormLabel>Tác giả</FormLabel>
              <StyledTextField name='author' defaultValue={book.author} />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <FormLabel>Nguồn</FormLabel>
              <StyledSelect id="genres" name="genre" defaultValue={book.genre}>
                {genres.map(genre => (
                  <MenuItem key={genre.id} value={genre.name}>{genre.name}</MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Mô tả</FormLabel>
            <StyledTextField name='description' defaultValue={book.description} />
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
            <FormLabel>Giá sale</FormLabel>
            <StyledTextField type='number' name='salePrice' defaultValue={book.salePrice} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormLabel>Giá</FormLabel>
            <StyledTextField type='number' name='price' defaultValue={book.price} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <StyledTextField name='publisher' label='File hiện tại' placeholder='Upload File' value={book.publisher} />
            <ButtonStyled component='label' variant='contained' htmlFor='upload-file'>
              Chọn file
              <input
                hidden
                type='file'
                onChange={fileUploadOnChange}
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
          <Grid item xs={12} sm={6} sx={{ marginTop: 4.8 }}>
            <Typography variant='h6'>Hình ảnh hiện tại:</Typography>
            {images.map((img, index) => (
              <ImgStyled key={index} src={img} />
            ))}
            <Box>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Thêm ảnh
                <input
                  hidden
                  type='file'
                  onChange={fileOnChange}
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
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}
              onClick={postData}
            >
              Sửa
            </Button>
            <Button type='reset' variant='outlined' color='secondary'
              onClick={() => { document.getElementById('book-form').reset() }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default UpdateBook;

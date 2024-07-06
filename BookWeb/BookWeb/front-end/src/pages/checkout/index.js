import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import formater from 'src/utils/formatCurrency';
import DefaultLayout from 'src/layouts/DefaultLayout';
import {
  Input,
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Breadcrumbs,
  Select,
  MenuItem
} from '@mui/material';
import Swal from 'sweetalert2';

const getToken = () => {
  return localStorage.getItem('token');
};
const BASE_URL = 'http://127.0.0.1:8080/api';

export default function Checkout() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [amount, setAmount] = useState(0);
  const [image, setImages] = useState([]);
  
  const calculateTotal  = () => cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  const total = Number(calculateTotal());
  
  

  const updateCart = async (newCart) => {
    await fetch(`${BASE_URL}/user/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCart)
    });

  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tok = getToken();
      setToken(tok);

      const fetchUser = async () => {
        try {
          const cart = await fetch(`${BASE_URL}/user/cart`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tok}`
            }
          }).then(res => res.json());
          setCart(cart);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, []);

  const handleChange = (e) => {
      setPaymentMethod(e.target.value)
  }

  const handleClick = async() => {
    

    if (!address) {
      Swal.fire("Vui lòng nhập địa chỉ gmail hoặc Số điện thoại", "", "warning");
      
      return;
    }

    switch (paymentMethod) {
      case "COD":
          const resp = await fetch(`${BASE_URL}/order/checkout`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ address })
          });
      
          if (resp.status == 200) {
            Swal.fire("Thanh toán thành công", "", "success");
            router.push('/');
          } else {
            Swal.fire("Thanh toán thất bại", "", "error");
          }
        break;
      case "ONLINE":
        
        const fetchVnpay = await fetch(`${BASE_URL}/payment/vn-pay?amount=123333&backCode=NCb`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        });
    
        if (fetchVnpay.status == 200) {
          const data  = await fetchVnpay.json()
          console.log(data.paymentUrl)
          Swal.fire("Thanh toán thành công", "", "success");
          window.location.href = data.paymentUrl;
        } else {
          Swal.fire("Thanh toán thất bại", "", "error");
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
    <Typography component="h3"> Trang thanh toán</Typography>
    <Container maxWidth='lg' sx={{marginTop:5}}>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 10,
          paddingBottom: 5,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Grid item md={12} marginBottom={5}>
          <Box sx={{ borderBottom: '1px solid #ced4da' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Thông tin</Typography>
          </Box>
          <Box display={'flex'} alignItems={'center'}>
            <Grid item md={3}>
              <Typography> Gmail/SDT: </Typography>
            </Grid>
            <Grid item md={9}>
              <Input 
                type='text' 
                placeholder='Nhập địa chỉ Gmail hoặc số điện thoại' 
                fullWidth 
                onChange={(e) => setAddress(e.target.value)}
                required
              >
              </Input>
            </Grid>
          </Box>
        </Grid>

        <Grid item md={3}>
          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Phương thức thanh toán</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentMethod}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value={"COD"}>COD</MenuItem>
              <MenuItem value={"ONLINE"}>Banking</MenuItem>
            
            </Select>
          </Box>
        </Grid>
        
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
         
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
       
       
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Box sx={{ borderBottom: '1px solid #ced4da' }}>
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Kiểm tra</Typography>
        </Box>
        <Box>
        {cart.map((item, i) => {
            return (
              <Box key={i} marginTop={3} marginRight={4} bgcolor="white" borderRadius={1}>
                <Box display="flex" padding={4}>
                  <Box flexBasis="16%">
                    <Box
                      overflow="hidden"
                      width="120px"
                      height="120px"
                      component="img"
                      src={item.image}
                    />
                  </Box >
                  <Box display="flex" flexBasis="68%">
                    <Box display="flex" flexBasis="60%" flexDirection="column" justifyContent="space-between">
                      <Typography fontSize={14}>
                        {item.title}
                      </Typography>
                      <Typography fontWeight={700}>
                        {formater.format(item.price)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box flexBasis="28%" display="flex" alignItems="center" justifyContent="space-between">
                
                    <button id={item.itemId} type='submit' onClick={async (e) => {
                      const newCart = cart.filter(v => v.itemId != e.target.id);
                      await updateCart(newCart);
                      setCart(newCart);
                    }}>Hủy bỏ</button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'row-reverse',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20
        }}
      >
        <Button
          sx={{
            color: '#fff',
            background: '#C92127',
            width: 220,
            height: 44,
            transition: 'background-color 0.3s ease',
            ':hover': {
              cursor: 'pointer',
              background: '#f55207'
            }
          }}
          onClick={handleClick}
        >
          Xác Nhận
        </Button>
      </Grid>
    </Container> 
    </>
  );
}

Checkout.getLayout = page => <DefaultLayout> {page} </DefaultLayout>;

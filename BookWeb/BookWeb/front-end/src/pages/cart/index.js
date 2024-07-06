import { Container, Grid, Box, Typography, Divider, Button, Link } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import router from 'next/router'
import { useEffect, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import QuantityInput from 'src/components/NumberInput'
import formater from 'src/utils/formatCurrency'

const getToken = () => {
  return localStorage.getItem('token')
}
const BASE_URL = 'http://127.0.0.1:8080/api'

const CartPage = () => {
  const [token, setToken] = useState('')
  const [cart, setCart] = useState([])

  const updateCart = async newCart => {
    await fetch(`${BASE_URL}/user/cart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCart)
    })
    setCart(newCart) // Đảm bảo rằng trạng thái được cập nhật ngay lập tức
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tok = getToken()
      setToken(tok)
      if (tok == null) router.push('/pages/login')

      const fetchUser = async () => {
        try {
          const cart = await fetch(`${BASE_URL}/user/cart`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${tok}`
            }
          }).then(res => res.json())
          setCart(cart)
          console.log(cart)
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
    }
  }, [])

  const handleIncrement = id => async () => {
    const newCart = cart.map(item => {
      if (item.itemId === id) {
        return { ...item, quantity: item.quantity + 1 }
      }

      return item
    })
    console.log('Increment:', newCart) // Kiểm tra giá trị mới của newCart
    await updateCart(newCart)
  }

  const handleDecrement = id => async () => {
    const newCart = cart.map(item => {
      if (item.itemId === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 }
      }

      return item
    })
    console.log('Decrement:', newCart) // Kiểm tra giá trị mới của newCart
    await updateCart(newCart)
  }

  return (
    <Container sx={{ marginTop: '80px' }}>
      <Grid container>
        <Grid item md={8}>
          {cart.map((item, i) => {
            return (
              <Box key={i} marginTop={3} marginRight={4} bgcolor='white' borderRadius={1}>
                <Box display='flex' padding={4}>
                  <Box flexBasis='16%'>
                    <Box overflow='hidden' width='120px' height='120px' component='img' src={item.image} />
                  </Box>
                  <Box display='flex' flexBasis='68%'>
                    <Box
                      display='flex'
                      flexBasis='60%'
                      flexDirection='column'
                      justifyContent='space-between'
                      marginLeft={4}
                    >
                      <Typography fontSize={14}>{item.title}</Typography>
                      <Typography fontWeight={700}>{formater.format(item.price)}</Typography>
                    </Box>
                  </Box>
                  <Box flexBasis='28%' display='flex' alignItems='center' justifyContent='space-between'>
                    <input
                      id={`item-${item.itemId}`}
                      type='number'
                      defaultValue={item.quantity}
                      name='quantity'
                      onChange={async e => {
                        const id = e.target.id.split('-')[1]

                        const newCart = cart.map(v => {
                          if (v.itemId != id) return v
                          
                          return {
                            ...v,
                            quantity: e.target.value
                          }
                        })
                        await updateCart(newCart)
                        setCart(newCart)
                      }}
                    />
                    <DeleteIcon
                      id={item.itemId}
                      type='submit'
                      onClick={async e => {
                        const newCart = cart.filter(v => v.itemId != e.target.id)
                        await updateCart(newCart)
                      }}
                      sx={{
                        '&:hover': {
                          color: 'red',
                          cursor: 'pointer'
                        }
                      }}
                    >
                      Loại bỏ
                    </DeleteIcon>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Grid>

      </Grid>
    </Container>
  )
}

CartPage.getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default CartPage

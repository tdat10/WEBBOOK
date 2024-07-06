package com.bookweb.bookweb.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookweb.bookweb.models.Book;
import com.bookweb.bookweb.models.Order;
import com.bookweb.bookweb.repositories.BookRepository;
import com.bookweb.bookweb.repositories.OrderRepository;


@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    private BookRepository bookRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    
    public Order createOrder(Order order) {
        try{
            orderRepository.save(order);
            return order;
        }
        catch (Exception e) {
            return null;
        }
    }


    public String deleteOrder(String id) {
        try{
            orderRepository.deleteById(id);
            return "Delete Success!";
        }
        catch( Exception e) {
            return "Fail!";
        }
    }


    public String updateOrder(String id, String status) {
       try {
            Order order = orderRepository.findById(id).get();
            if (order.getOrderStatus().equals("Đã giao")
                    || order.getOrderStatus().equals("Đã hủy")) {
                return "Update success";
            }
            order.setOrderStatus(status);
            if (status.equals("Đã giao")) {
                var items = order.getOrderItems();
                for (var item : items) {
                    Book book = bookRepository.findById(item.getItemId()).get();
                    if (book.getSoldQty() >= item.getQuantity()) {
                        return "Update success";
                    }
                    //book.setStock(book.getStock() - item.getQuantity());
                    book.setSoldQty(book.getSoldQty() + item.getQuantity());
                    bookRepository.save(book);
                }
            }
            orderRepository.save(order);
            return "Update success";
        } catch (Exception e) {
            return "Update fail";
        }

    }


    public List<Order> findOrderById(String id) {
        List<Order> orders = new ArrayList<>();
        var order = orderRepository.findById(id).get();
        orders.add(order);

        return orders;
    }   
    
}

    

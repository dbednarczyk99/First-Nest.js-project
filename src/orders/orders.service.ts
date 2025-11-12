import { Injectable } from '@nestjs/common';
import { Order, db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(orderId: Order['id']): Order | null {
    return db.orders.find((o) => o.id === orderId);
  }

  public deleteById(orderId: Order['id']): void {
    db.orders = db.orders.filter((o) => o.id !== orderId);
  }

  public create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { id: uuidv4(), ...orderData };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(id: Order['id'], orderData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((o) => {
      if (o.id === id) return { ...o, ...orderData };
      else return o;
    });
  }
}

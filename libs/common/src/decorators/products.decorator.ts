const Items = require('./shop-items.json')
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Products = createParamDecorator(
    (_data: unknown, context: ExecutionContext)=>{ 
        return Items
    }
);
import { createParamDecorator } from '@nestjs/common';

/**
 * @description 用于去除 对象 / 数组 中的'_id'和'__v'字段,只能用于单一查询
 * @param {any} target 表示被装饰的类实例
 * @param {string} propertyKey 表示被装饰的方法名
 * @param {PropertyDescriptor} descriptor 表示被装饰的方法的属性描述符
 * @returns 返回一个没有 "_id","__v" 的数组 / 对象
 */
export const ClearUselessPropertie = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    const info = await originalMethod.apply(this, args);
    const newResult = JSON.parse(JSON.stringify(info));
    // 修改返回值
    switch (newResult.constructor) {
      case Object:
        delete newResult._id;
        delete newResult.__v;
        break;
      case Array:
        for (let i = 0; i < newResult.length; i++) {
          if ('_id' in newResult[i]) {
            delete newResult[i]._id;
          }
          if ('__v' in newResult[i]) {
            delete newResult[i].__v;
          }
        }
        break;
      default:
        console.log(`该函数返回值不为 '数组' / '对象' 类型 `);
    }
    return newResult;
  };
  return descriptor;
};

export const CurrentUser = createParamDecorator((data, req) => {
  return req.user;
});

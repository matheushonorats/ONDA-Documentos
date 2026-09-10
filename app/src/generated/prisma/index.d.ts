
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Agencia
 * 
 */
export type Agencia = $Result.DefaultSelection<Prisma.$AgenciaPayload>
/**
 * Model Veiculo
 * 
 */
export type Veiculo = $Result.DefaultSelection<Prisma.$VeiculoPayload>
/**
 * Model Colaborador
 * 
 */
export type Colaborador = $Result.DefaultSelection<Prisma.$ColaboradorPayload>
/**
 * Model Lancamento
 * 
 */
export type Lancamento = $Result.DefaultSelection<Prisma.$LancamentoPayload>
/**
 * Model TipoDocumento
 * 
 */
export type TipoDocumento = $Result.DefaultSelection<Prisma.$TipoDocumentoPayload>
/**
 * Model Documento
 * 
 */
export type Documento = $Result.DefaultSelection<Prisma.$DocumentoPayload>
/**
 * Model HistoricoLancamento
 * 
 */
export type HistoricoLancamento = $Result.DefaultSelection<Prisma.$HistoricoLancamentoPayload>
/**
 * Model MarcacaoComplementacao
 * 
 */
export type MarcacaoComplementacao = $Result.DefaultSelection<Prisma.$MarcacaoComplementacaoPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clientes
 * const clientes = await prisma.cliente.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clientes
   * const clientes = await prisma.cliente.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs>;

  /**
   * `prisma.agencia`: Exposes CRUD operations for the **Agencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agencias
    * const agencias = await prisma.agencia.findMany()
    * ```
    */
  get agencia(): Prisma.AgenciaDelegate<ExtArgs>;

  /**
   * `prisma.veiculo`: Exposes CRUD operations for the **Veiculo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Veiculos
    * const veiculos = await prisma.veiculo.findMany()
    * ```
    */
  get veiculo(): Prisma.VeiculoDelegate<ExtArgs>;

  /**
   * `prisma.colaborador`: Exposes CRUD operations for the **Colaborador** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Colaboradors
    * const colaboradors = await prisma.colaborador.findMany()
    * ```
    */
  get colaborador(): Prisma.ColaboradorDelegate<ExtArgs>;

  /**
   * `prisma.lancamento`: Exposes CRUD operations for the **Lancamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lancamentos
    * const lancamentos = await prisma.lancamento.findMany()
    * ```
    */
  get lancamento(): Prisma.LancamentoDelegate<ExtArgs>;

  /**
   * `prisma.tipoDocumento`: Exposes CRUD operations for the **TipoDocumento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TipoDocumentos
    * const tipoDocumentos = await prisma.tipoDocumento.findMany()
    * ```
    */
  get tipoDocumento(): Prisma.TipoDocumentoDelegate<ExtArgs>;

  /**
   * `prisma.documento`: Exposes CRUD operations for the **Documento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documentos
    * const documentos = await prisma.documento.findMany()
    * ```
    */
  get documento(): Prisma.DocumentoDelegate<ExtArgs>;

  /**
   * `prisma.historicoLancamento`: Exposes CRUD operations for the **HistoricoLancamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HistoricoLancamentos
    * const historicoLancamentos = await prisma.historicoLancamento.findMany()
    * ```
    */
  get historicoLancamento(): Prisma.HistoricoLancamentoDelegate<ExtArgs>;

  /**
   * `prisma.marcacaoComplementacao`: Exposes CRUD operations for the **MarcacaoComplementacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarcacaoComplementacaos
    * const marcacaoComplementacaos = await prisma.marcacaoComplementacao.findMany()
    * ```
    */
  get marcacaoComplementacao(): Prisma.MarcacaoComplementacaoDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Cliente: 'Cliente',
    Agencia: 'Agencia',
    Veiculo: 'Veiculo',
    Colaborador: 'Colaborador',
    Lancamento: 'Lancamento',
    TipoDocumento: 'TipoDocumento',
    Documento: 'Documento',
    HistoricoLancamento: 'HistoricoLancamento',
    MarcacaoComplementacao: 'MarcacaoComplementacao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "cliente" | "agencia" | "veiculo" | "colaborador" | "lancamento" | "tipoDocumento" | "documento" | "historicoLancamento" | "marcacaoComplementacao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Agencia: {
        payload: Prisma.$AgenciaPayload<ExtArgs>
        fields: Prisma.AgenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgenciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgenciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>
          }
          findFirst: {
            args: Prisma.AgenciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgenciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>
          }
          findMany: {
            args: Prisma.AgenciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>[]
          }
          create: {
            args: Prisma.AgenciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>
          }
          createMany: {
            args: Prisma.AgenciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgenciaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>[]
          }
          delete: {
            args: Prisma.AgenciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>
          }
          update: {
            args: Prisma.AgenciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>
          }
          deleteMany: {
            args: Prisma.AgenciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgenciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgenciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgenciaPayload>
          }
          aggregate: {
            args: Prisma.AgenciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgencia>
          }
          groupBy: {
            args: Prisma.AgenciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgenciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgenciaCountArgs<ExtArgs>
            result: $Utils.Optional<AgenciaCountAggregateOutputType> | number
          }
        }
      }
      Veiculo: {
        payload: Prisma.$VeiculoPayload<ExtArgs>
        fields: Prisma.VeiculoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VeiculoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VeiculoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          findFirst: {
            args: Prisma.VeiculoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VeiculoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          findMany: {
            args: Prisma.VeiculoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>[]
          }
          create: {
            args: Prisma.VeiculoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          createMany: {
            args: Prisma.VeiculoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VeiculoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>[]
          }
          delete: {
            args: Prisma.VeiculoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          update: {
            args: Prisma.VeiculoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          deleteMany: {
            args: Prisma.VeiculoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VeiculoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VeiculoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          aggregate: {
            args: Prisma.VeiculoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVeiculo>
          }
          groupBy: {
            args: Prisma.VeiculoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VeiculoGroupByOutputType>[]
          }
          count: {
            args: Prisma.VeiculoCountArgs<ExtArgs>
            result: $Utils.Optional<VeiculoCountAggregateOutputType> | number
          }
        }
      }
      Colaborador: {
        payload: Prisma.$ColaboradorPayload<ExtArgs>
        fields: Prisma.ColaboradorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColaboradorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColaboradorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>
          }
          findFirst: {
            args: Prisma.ColaboradorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColaboradorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>
          }
          findMany: {
            args: Prisma.ColaboradorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>[]
          }
          create: {
            args: Prisma.ColaboradorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>
          }
          createMany: {
            args: Prisma.ColaboradorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColaboradorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>[]
          }
          delete: {
            args: Prisma.ColaboradorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>
          }
          update: {
            args: Prisma.ColaboradorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>
          }
          deleteMany: {
            args: Prisma.ColaboradorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColaboradorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ColaboradorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColaboradorPayload>
          }
          aggregate: {
            args: Prisma.ColaboradorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColaborador>
          }
          groupBy: {
            args: Prisma.ColaboradorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColaboradorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColaboradorCountArgs<ExtArgs>
            result: $Utils.Optional<ColaboradorCountAggregateOutputType> | number
          }
        }
      }
      Lancamento: {
        payload: Prisma.$LancamentoPayload<ExtArgs>
        fields: Prisma.LancamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LancamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LancamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          findFirst: {
            args: Prisma.LancamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LancamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          findMany: {
            args: Prisma.LancamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>[]
          }
          create: {
            args: Prisma.LancamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          createMany: {
            args: Prisma.LancamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LancamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>[]
          }
          delete: {
            args: Prisma.LancamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          update: {
            args: Prisma.LancamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          deleteMany: {
            args: Prisma.LancamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LancamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LancamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LancamentoPayload>
          }
          aggregate: {
            args: Prisma.LancamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLancamento>
          }
          groupBy: {
            args: Prisma.LancamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<LancamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.LancamentoCountArgs<ExtArgs>
            result: $Utils.Optional<LancamentoCountAggregateOutputType> | number
          }
        }
      }
      TipoDocumento: {
        payload: Prisma.$TipoDocumentoPayload<ExtArgs>
        fields: Prisma.TipoDocumentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TipoDocumentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TipoDocumentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>
          }
          findFirst: {
            args: Prisma.TipoDocumentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TipoDocumentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>
          }
          findMany: {
            args: Prisma.TipoDocumentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>[]
          }
          create: {
            args: Prisma.TipoDocumentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>
          }
          createMany: {
            args: Prisma.TipoDocumentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TipoDocumentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>[]
          }
          delete: {
            args: Prisma.TipoDocumentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>
          }
          update: {
            args: Prisma.TipoDocumentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>
          }
          deleteMany: {
            args: Prisma.TipoDocumentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TipoDocumentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TipoDocumentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TipoDocumentoPayload>
          }
          aggregate: {
            args: Prisma.TipoDocumentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipoDocumento>
          }
          groupBy: {
            args: Prisma.TipoDocumentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TipoDocumentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.TipoDocumentoCountArgs<ExtArgs>
            result: $Utils.Optional<TipoDocumentoCountAggregateOutputType> | number
          }
        }
      }
      Documento: {
        payload: Prisma.$DocumentoPayload<ExtArgs>
        fields: Prisma.DocumentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>
          }
          findFirst: {
            args: Prisma.DocumentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>
          }
          findMany: {
            args: Prisma.DocumentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>[]
          }
          create: {
            args: Prisma.DocumentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>
          }
          createMany: {
            args: Prisma.DocumentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>[]
          }
          delete: {
            args: Prisma.DocumentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>
          }
          update: {
            args: Prisma.DocumentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>
          }
          deleteMany: {
            args: Prisma.DocumentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentoPayload>
          }
          aggregate: {
            args: Prisma.DocumentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumento>
          }
          groupBy: {
            args: Prisma.DocumentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentoCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentoCountAggregateOutputType> | number
          }
        }
      }
      HistoricoLancamento: {
        payload: Prisma.$HistoricoLancamentoPayload<ExtArgs>
        fields: Prisma.HistoricoLancamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HistoricoLancamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HistoricoLancamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>
          }
          findFirst: {
            args: Prisma.HistoricoLancamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HistoricoLancamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>
          }
          findMany: {
            args: Prisma.HistoricoLancamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>[]
          }
          create: {
            args: Prisma.HistoricoLancamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>
          }
          createMany: {
            args: Prisma.HistoricoLancamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HistoricoLancamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>[]
          }
          delete: {
            args: Prisma.HistoricoLancamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>
          }
          update: {
            args: Prisma.HistoricoLancamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>
          }
          deleteMany: {
            args: Prisma.HistoricoLancamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HistoricoLancamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HistoricoLancamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HistoricoLancamentoPayload>
          }
          aggregate: {
            args: Prisma.HistoricoLancamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHistoricoLancamento>
          }
          groupBy: {
            args: Prisma.HistoricoLancamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<HistoricoLancamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.HistoricoLancamentoCountArgs<ExtArgs>
            result: $Utils.Optional<HistoricoLancamentoCountAggregateOutputType> | number
          }
        }
      }
      MarcacaoComplementacao: {
        payload: Prisma.$MarcacaoComplementacaoPayload<ExtArgs>
        fields: Prisma.MarcacaoComplementacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarcacaoComplementacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarcacaoComplementacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>
          }
          findFirst: {
            args: Prisma.MarcacaoComplementacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarcacaoComplementacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>
          }
          findMany: {
            args: Prisma.MarcacaoComplementacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>[]
          }
          create: {
            args: Prisma.MarcacaoComplementacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>
          }
          createMany: {
            args: Prisma.MarcacaoComplementacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarcacaoComplementacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>[]
          }
          delete: {
            args: Prisma.MarcacaoComplementacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>
          }
          update: {
            args: Prisma.MarcacaoComplementacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>
          }
          deleteMany: {
            args: Prisma.MarcacaoComplementacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarcacaoComplementacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MarcacaoComplementacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcacaoComplementacaoPayload>
          }
          aggregate: {
            args: Prisma.MarcacaoComplementacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarcacaoComplementacao>
          }
          groupBy: {
            args: Prisma.MarcacaoComplementacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarcacaoComplementacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarcacaoComplementacaoCountArgs<ExtArgs>
            result: $Utils.Optional<MarcacaoComplementacaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.DriverAdapter | null
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    lancamentos: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | ClienteCountOutputTypeCountLancamentosArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountLancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
  }


  /**
   * Count Type AgenciaCountOutputType
   */

  export type AgenciaCountOutputType = {
    lancamentos: number
  }

  export type AgenciaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | AgenciaCountOutputTypeCountLancamentosArgs
  }

  // Custom InputTypes
  /**
   * AgenciaCountOutputType without action
   */
  export type AgenciaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgenciaCountOutputType
     */
    select?: AgenciaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgenciaCountOutputType without action
   */
  export type AgenciaCountOutputTypeCountLancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
  }


  /**
   * Count Type VeiculoCountOutputType
   */

  export type VeiculoCountOutputType = {
    lancamentos: number
  }

  export type VeiculoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | VeiculoCountOutputTypeCountLancamentosArgs
  }

  // Custom InputTypes
  /**
   * VeiculoCountOutputType without action
   */
  export type VeiculoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VeiculoCountOutputType
     */
    select?: VeiculoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VeiculoCountOutputType without action
   */
  export type VeiculoCountOutputTypeCountLancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
  }


  /**
   * Count Type ColaboradorCountOutputType
   */

  export type ColaboradorCountOutputType = {
    lancamentos: number
  }

  export type ColaboradorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | ColaboradorCountOutputTypeCountLancamentosArgs
  }

  // Custom InputTypes
  /**
   * ColaboradorCountOutputType without action
   */
  export type ColaboradorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColaboradorCountOutputType
     */
    select?: ColaboradorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ColaboradorCountOutputType without action
   */
  export type ColaboradorCountOutputTypeCountLancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
  }


  /**
   * Count Type LancamentoCountOutputType
   */

  export type LancamentoCountOutputType = {
    documentos: number
    marcacoes: number
    historico: number
  }

  export type LancamentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documentos?: boolean | LancamentoCountOutputTypeCountDocumentosArgs
    marcacoes?: boolean | LancamentoCountOutputTypeCountMarcacoesArgs
    historico?: boolean | LancamentoCountOutputTypeCountHistoricoArgs
  }

  // Custom InputTypes
  /**
   * LancamentoCountOutputType without action
   */
  export type LancamentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LancamentoCountOutputType
     */
    select?: LancamentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LancamentoCountOutputType without action
   */
  export type LancamentoCountOutputTypeCountDocumentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentoWhereInput
  }

  /**
   * LancamentoCountOutputType without action
   */
  export type LancamentoCountOutputTypeCountMarcacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarcacaoComplementacaoWhereInput
  }

  /**
   * LancamentoCountOutputType without action
   */
  export type LancamentoCountOutputTypeCountHistoricoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoricoLancamentoWhereInput
  }


  /**
   * Count Type TipoDocumentoCountOutputType
   */

  export type TipoDocumentoCountOutputType = {
    documentos: number
  }

  export type TipoDocumentoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documentos?: boolean | TipoDocumentoCountOutputTypeCountDocumentosArgs
  }

  // Custom InputTypes
  /**
   * TipoDocumentoCountOutputType without action
   */
  export type TipoDocumentoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumentoCountOutputType
     */
    select?: TipoDocumentoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TipoDocumentoCountOutputType without action
   */
  export type TipoDocumentoCountOutputTypeCountDocumentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteMinAggregateOutputType = {
    id: string | null
    legacyId: string | null
    nomeFantasia: string | null
    razaoSocial: string | null
    cnpj: string | null
    cidade: string | null
    tipificacao: string | null
    dadosCadastrais: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: string | null
    legacyId: string | null
    nomeFantasia: string | null
    razaoSocial: string | null
    cnpj: string | null
    cidade: string | null
    tipificacao: string | null
    dadosCadastrais: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    legacyId: number
    nomeFantasia: number
    razaoSocial: number
    cnpj: number
    cidade: number
    tipificacao: number
    dadosCadastrais: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClienteMinAggregateInputType = {
    id?: true
    legacyId?: true
    nomeFantasia?: true
    razaoSocial?: true
    cnpj?: true
    cidade?: true
    tipificacao?: true
    dadosCadastrais?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    legacyId?: true
    nomeFantasia?: true
    razaoSocial?: true
    cnpj?: true
    cidade?: true
    tipificacao?: true
    dadosCadastrais?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    legacyId?: true
    nomeFantasia?: true
    razaoSocial?: true
    cnpj?: true
    cidade?: true
    tipificacao?: true
    dadosCadastrais?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: string
    legacyId: string | null
    nomeFantasia: string | null
    razaoSocial: string
    cnpj: string | null
    cidade: string | null
    tipificacao: string | null
    dadosCadastrais: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    legacyId?: boolean
    nomeFantasia?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    cidade?: boolean
    tipificacao?: boolean
    dadosCadastrais?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lancamentos?: boolean | Cliente$lancamentosArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    legacyId?: boolean
    nomeFantasia?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    cidade?: boolean
    tipificacao?: boolean
    dadosCadastrais?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectScalar = {
    id?: boolean
    legacyId?: boolean
    nomeFantasia?: boolean
    razaoSocial?: boolean
    cnpj?: boolean
    cidade?: boolean
    tipificacao?: boolean
    dadosCadastrais?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | Cliente$lancamentosArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      lancamentos: Prisma.$LancamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      legacyId: string | null
      nomeFantasia: string | null
      razaoSocial: string
      cnpj: string | null
      cidade: string | null
      tipificacao: string | null
      dadosCadastrais: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clientes and returns the data saved in the database.
     * @param {ClienteCreateManyAndReturnArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClienteCreateManyAndReturnArgs>(args?: SelectSubset<T, ClienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lancamentos<T extends Cliente$lancamentosArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$lancamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */ 
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'String'>
    readonly legacyId: FieldRef<"Cliente", 'String'>
    readonly nomeFantasia: FieldRef<"Cliente", 'String'>
    readonly razaoSocial: FieldRef<"Cliente", 'String'>
    readonly cnpj: FieldRef<"Cliente", 'String'>
    readonly cidade: FieldRef<"Cliente", 'String'>
    readonly tipificacao: FieldRef<"Cliente", 'String'>
    readonly dadosCadastrais: FieldRef<"Cliente", 'String'>
    readonly createdAt: FieldRef<"Cliente", 'DateTime'>
    readonly updatedAt: FieldRef<"Cliente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
  }

  /**
   * Cliente createManyAndReturn
   */
  export type ClienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
  }

  /**
   * Cliente.lancamentos
   */
  export type Cliente$lancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    cursor?: LancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Agencia
   */

  export type AggregateAgencia = {
    _count: AgenciaCountAggregateOutputType | null
    _min: AgenciaMinAggregateOutputType | null
    _max: AgenciaMaxAggregateOutputType | null
  }

  export type AgenciaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cnpj: string | null
    contatos: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgenciaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cnpj: string | null
    contatos: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgenciaCountAggregateOutputType = {
    id: number
    nome: number
    cnpj: number
    contatos: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgenciaMinAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    contatos?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgenciaMaxAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    contatos?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgenciaCountAggregateInputType = {
    id?: true
    nome?: true
    cnpj?: true
    contatos?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgenciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agencia to aggregate.
     */
    where?: AgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencias to fetch.
     */
    orderBy?: AgenciaOrderByWithRelationInput | AgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agencias
    **/
    _count?: true | AgenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgenciaMaxAggregateInputType
  }

  export type GetAgenciaAggregateType<T extends AgenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateAgencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgencia[P]>
      : GetScalarType<T[P], AggregateAgencia[P]>
  }




  export type AgenciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgenciaWhereInput
    orderBy?: AgenciaOrderByWithAggregationInput | AgenciaOrderByWithAggregationInput[]
    by: AgenciaScalarFieldEnum[] | AgenciaScalarFieldEnum
    having?: AgenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgenciaCountAggregateInputType | true
    _min?: AgenciaMinAggregateInputType
    _max?: AgenciaMaxAggregateInputType
  }

  export type AgenciaGroupByOutputType = {
    id: string
    nome: string
    cnpj: string | null
    contatos: string | null
    createdAt: Date
    updatedAt: Date
    _count: AgenciaCountAggregateOutputType | null
    _min: AgenciaMinAggregateOutputType | null
    _max: AgenciaMaxAggregateOutputType | null
  }

  type GetAgenciaGroupByPayload<T extends AgenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgenciaGroupByOutputType[P]>
            : GetScalarType<T[P], AgenciaGroupByOutputType[P]>
        }
      >
    >


  export type AgenciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    contatos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lancamentos?: boolean | Agencia$lancamentosArgs<ExtArgs>
    _count?: boolean | AgenciaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agencia"]>

  export type AgenciaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    contatos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agencia"]>

  export type AgenciaSelectScalar = {
    id?: boolean
    nome?: boolean
    cnpj?: boolean
    contatos?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgenciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | Agencia$lancamentosArgs<ExtArgs>
    _count?: boolean | AgenciaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgenciaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgenciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agencia"
    objects: {
      lancamentos: Prisma.$LancamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      cnpj: string | null
      contatos: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agencia"]>
    composites: {}
  }

  type AgenciaGetPayload<S extends boolean | null | undefined | AgenciaDefaultArgs> = $Result.GetResult<Prisma.$AgenciaPayload, S>

  type AgenciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgenciaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgenciaCountAggregateInputType | true
    }

  export interface AgenciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agencia'], meta: { name: 'Agencia' } }
    /**
     * Find zero or one Agencia that matches the filter.
     * @param {AgenciaFindUniqueArgs} args - Arguments to find a Agencia
     * @example
     * // Get one Agencia
     * const agencia = await prisma.agencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgenciaFindUniqueArgs>(args: SelectSubset<T, AgenciaFindUniqueArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Agencia that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgenciaFindUniqueOrThrowArgs} args - Arguments to find a Agencia
     * @example
     * // Get one Agencia
     * const agencia = await prisma.agencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgenciaFindUniqueOrThrowArgs>(args: SelectSubset<T, AgenciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Agencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgenciaFindFirstArgs} args - Arguments to find a Agencia
     * @example
     * // Get one Agencia
     * const agencia = await prisma.agencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgenciaFindFirstArgs>(args?: SelectSubset<T, AgenciaFindFirstArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Agencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgenciaFindFirstOrThrowArgs} args - Arguments to find a Agencia
     * @example
     * // Get one Agencia
     * const agencia = await prisma.agencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgenciaFindFirstOrThrowArgs>(args?: SelectSubset<T, AgenciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Agencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgenciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agencias
     * const agencias = await prisma.agencia.findMany()
     * 
     * // Get first 10 Agencias
     * const agencias = await prisma.agencia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agenciaWithIdOnly = await prisma.agencia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgenciaFindManyArgs>(args?: SelectSubset<T, AgenciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Agencia.
     * @param {AgenciaCreateArgs} args - Arguments to create a Agencia.
     * @example
     * // Create one Agencia
     * const Agencia = await prisma.agencia.create({
     *   data: {
     *     // ... data to create a Agencia
     *   }
     * })
     * 
     */
    create<T extends AgenciaCreateArgs>(args: SelectSubset<T, AgenciaCreateArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Agencias.
     * @param {AgenciaCreateManyArgs} args - Arguments to create many Agencias.
     * @example
     * // Create many Agencias
     * const agencia = await prisma.agencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgenciaCreateManyArgs>(args?: SelectSubset<T, AgenciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agencias and returns the data saved in the database.
     * @param {AgenciaCreateManyAndReturnArgs} args - Arguments to create many Agencias.
     * @example
     * // Create many Agencias
     * const agencia = await prisma.agencia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agencias and only return the `id`
     * const agenciaWithIdOnly = await prisma.agencia.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgenciaCreateManyAndReturnArgs>(args?: SelectSubset<T, AgenciaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Agencia.
     * @param {AgenciaDeleteArgs} args - Arguments to delete one Agencia.
     * @example
     * // Delete one Agencia
     * const Agencia = await prisma.agencia.delete({
     *   where: {
     *     // ... filter to delete one Agencia
     *   }
     * })
     * 
     */
    delete<T extends AgenciaDeleteArgs>(args: SelectSubset<T, AgenciaDeleteArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Agencia.
     * @param {AgenciaUpdateArgs} args - Arguments to update one Agencia.
     * @example
     * // Update one Agencia
     * const agencia = await prisma.agencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgenciaUpdateArgs>(args: SelectSubset<T, AgenciaUpdateArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Agencias.
     * @param {AgenciaDeleteManyArgs} args - Arguments to filter Agencias to delete.
     * @example
     * // Delete a few Agencias
     * const { count } = await prisma.agencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgenciaDeleteManyArgs>(args?: SelectSubset<T, AgenciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agencias
     * const agencia = await prisma.agencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgenciaUpdateManyArgs>(args: SelectSubset<T, AgenciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Agencia.
     * @param {AgenciaUpsertArgs} args - Arguments to update or create a Agencia.
     * @example
     * // Update or create a Agencia
     * const agencia = await prisma.agencia.upsert({
     *   create: {
     *     // ... data to create a Agencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agencia we want to update
     *   }
     * })
     */
    upsert<T extends AgenciaUpsertArgs>(args: SelectSubset<T, AgenciaUpsertArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Agencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgenciaCountArgs} args - Arguments to filter Agencias to count.
     * @example
     * // Count the number of Agencias
     * const count = await prisma.agencia.count({
     *   where: {
     *     // ... the filter for the Agencias we want to count
     *   }
     * })
    **/
    count<T extends AgenciaCountArgs>(
      args?: Subset<T, AgenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgenciaAggregateArgs>(args: Subset<T, AgenciaAggregateArgs>): Prisma.PrismaPromise<GetAgenciaAggregateType<T>>

    /**
     * Group by Agencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgenciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgenciaGroupByArgs['orderBy'] }
        : { orderBy?: AgenciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agencia model
   */
  readonly fields: AgenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgenciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lancamentos<T extends Agencia$lancamentosArgs<ExtArgs> = {}>(args?: Subset<T, Agencia$lancamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agencia model
   */ 
  interface AgenciaFieldRefs {
    readonly id: FieldRef<"Agencia", 'String'>
    readonly nome: FieldRef<"Agencia", 'String'>
    readonly cnpj: FieldRef<"Agencia", 'String'>
    readonly contatos: FieldRef<"Agencia", 'String'>
    readonly createdAt: FieldRef<"Agencia", 'DateTime'>
    readonly updatedAt: FieldRef<"Agencia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agencia findUnique
   */
  export type AgenciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * Filter, which Agencia to fetch.
     */
    where: AgenciaWhereUniqueInput
  }

  /**
   * Agencia findUniqueOrThrow
   */
  export type AgenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * Filter, which Agencia to fetch.
     */
    where: AgenciaWhereUniqueInput
  }

  /**
   * Agencia findFirst
   */
  export type AgenciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * Filter, which Agencia to fetch.
     */
    where?: AgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencias to fetch.
     */
    orderBy?: AgenciaOrderByWithRelationInput | AgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agencias.
     */
    cursor?: AgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agencias.
     */
    distinct?: AgenciaScalarFieldEnum | AgenciaScalarFieldEnum[]
  }

  /**
   * Agencia findFirstOrThrow
   */
  export type AgenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * Filter, which Agencia to fetch.
     */
    where?: AgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencias to fetch.
     */
    orderBy?: AgenciaOrderByWithRelationInput | AgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agencias.
     */
    cursor?: AgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agencias.
     */
    distinct?: AgenciaScalarFieldEnum | AgenciaScalarFieldEnum[]
  }

  /**
   * Agencia findMany
   */
  export type AgenciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * Filter, which Agencias to fetch.
     */
    where?: AgenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agencias to fetch.
     */
    orderBy?: AgenciaOrderByWithRelationInput | AgenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agencias.
     */
    cursor?: AgenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agencias.
     */
    skip?: number
    distinct?: AgenciaScalarFieldEnum | AgenciaScalarFieldEnum[]
  }

  /**
   * Agencia create
   */
  export type AgenciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * The data needed to create a Agencia.
     */
    data: XOR<AgenciaCreateInput, AgenciaUncheckedCreateInput>
  }

  /**
   * Agencia createMany
   */
  export type AgenciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agencias.
     */
    data: AgenciaCreateManyInput | AgenciaCreateManyInput[]
  }

  /**
   * Agencia createManyAndReturn
   */
  export type AgenciaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Agencias.
     */
    data: AgenciaCreateManyInput | AgenciaCreateManyInput[]
  }

  /**
   * Agencia update
   */
  export type AgenciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * The data needed to update a Agencia.
     */
    data: XOR<AgenciaUpdateInput, AgenciaUncheckedUpdateInput>
    /**
     * Choose, which Agencia to update.
     */
    where: AgenciaWhereUniqueInput
  }

  /**
   * Agencia updateMany
   */
  export type AgenciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agencias.
     */
    data: XOR<AgenciaUpdateManyMutationInput, AgenciaUncheckedUpdateManyInput>
    /**
     * Filter which Agencias to update
     */
    where?: AgenciaWhereInput
  }

  /**
   * Agencia upsert
   */
  export type AgenciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * The filter to search for the Agencia to update in case it exists.
     */
    where: AgenciaWhereUniqueInput
    /**
     * In case the Agencia found by the `where` argument doesn't exist, create a new Agencia with this data.
     */
    create: XOR<AgenciaCreateInput, AgenciaUncheckedCreateInput>
    /**
     * In case the Agencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgenciaUpdateInput, AgenciaUncheckedUpdateInput>
  }

  /**
   * Agencia delete
   */
  export type AgenciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    /**
     * Filter which Agencia to delete.
     */
    where: AgenciaWhereUniqueInput
  }

  /**
   * Agencia deleteMany
   */
  export type AgenciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agencias to delete
     */
    where?: AgenciaWhereInput
  }

  /**
   * Agencia.lancamentos
   */
  export type Agencia$lancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    cursor?: LancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Agencia without action
   */
  export type AgenciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
  }


  /**
   * Model Veiculo
   */

  export type AggregateVeiculo = {
    _count: VeiculoCountAggregateOutputType | null
    _min: VeiculoMinAggregateOutputType | null
    _max: VeiculoMaxAggregateOutputType | null
  }

  export type VeiculoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    identificacao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VeiculoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    identificacao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VeiculoCountAggregateOutputType = {
    id: number
    nome: number
    identificacao: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VeiculoMinAggregateInputType = {
    id?: true
    nome?: true
    identificacao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VeiculoMaxAggregateInputType = {
    id?: true
    nome?: true
    identificacao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VeiculoCountAggregateInputType = {
    id?: true
    nome?: true
    identificacao?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VeiculoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Veiculo to aggregate.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Veiculos
    **/
    _count?: true | VeiculoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VeiculoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VeiculoMaxAggregateInputType
  }

  export type GetVeiculoAggregateType<T extends VeiculoAggregateArgs> = {
        [P in keyof T & keyof AggregateVeiculo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVeiculo[P]>
      : GetScalarType<T[P], AggregateVeiculo[P]>
  }




  export type VeiculoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VeiculoWhereInput
    orderBy?: VeiculoOrderByWithAggregationInput | VeiculoOrderByWithAggregationInput[]
    by: VeiculoScalarFieldEnum[] | VeiculoScalarFieldEnum
    having?: VeiculoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VeiculoCountAggregateInputType | true
    _min?: VeiculoMinAggregateInputType
    _max?: VeiculoMaxAggregateInputType
  }

  export type VeiculoGroupByOutputType = {
    id: string
    nome: string
    identificacao: string | null
    createdAt: Date
    updatedAt: Date
    _count: VeiculoCountAggregateOutputType | null
    _min: VeiculoMinAggregateOutputType | null
    _max: VeiculoMaxAggregateOutputType | null
  }

  type GetVeiculoGroupByPayload<T extends VeiculoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VeiculoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VeiculoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VeiculoGroupByOutputType[P]>
            : GetScalarType<T[P], VeiculoGroupByOutputType[P]>
        }
      >
    >


  export type VeiculoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    identificacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lancamentos?: boolean | Veiculo$lancamentosArgs<ExtArgs>
    _count?: boolean | VeiculoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["veiculo"]>

  export type VeiculoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    identificacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["veiculo"]>

  export type VeiculoSelectScalar = {
    id?: boolean
    nome?: boolean
    identificacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VeiculoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | Veiculo$lancamentosArgs<ExtArgs>
    _count?: boolean | VeiculoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VeiculoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VeiculoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Veiculo"
    objects: {
      lancamentos: Prisma.$LancamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      identificacao: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["veiculo"]>
    composites: {}
  }

  type VeiculoGetPayload<S extends boolean | null | undefined | VeiculoDefaultArgs> = $Result.GetResult<Prisma.$VeiculoPayload, S>

  type VeiculoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VeiculoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VeiculoCountAggregateInputType | true
    }

  export interface VeiculoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Veiculo'], meta: { name: 'Veiculo' } }
    /**
     * Find zero or one Veiculo that matches the filter.
     * @param {VeiculoFindUniqueArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VeiculoFindUniqueArgs>(args: SelectSubset<T, VeiculoFindUniqueArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Veiculo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VeiculoFindUniqueOrThrowArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VeiculoFindUniqueOrThrowArgs>(args: SelectSubset<T, VeiculoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Veiculo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoFindFirstArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VeiculoFindFirstArgs>(args?: SelectSubset<T, VeiculoFindFirstArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Veiculo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoFindFirstOrThrowArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VeiculoFindFirstOrThrowArgs>(args?: SelectSubset<T, VeiculoFindFirstOrThrowArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Veiculos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Veiculos
     * const veiculos = await prisma.veiculo.findMany()
     * 
     * // Get first 10 Veiculos
     * const veiculos = await prisma.veiculo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const veiculoWithIdOnly = await prisma.veiculo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VeiculoFindManyArgs>(args?: SelectSubset<T, VeiculoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Veiculo.
     * @param {VeiculoCreateArgs} args - Arguments to create a Veiculo.
     * @example
     * // Create one Veiculo
     * const Veiculo = await prisma.veiculo.create({
     *   data: {
     *     // ... data to create a Veiculo
     *   }
     * })
     * 
     */
    create<T extends VeiculoCreateArgs>(args: SelectSubset<T, VeiculoCreateArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Veiculos.
     * @param {VeiculoCreateManyArgs} args - Arguments to create many Veiculos.
     * @example
     * // Create many Veiculos
     * const veiculo = await prisma.veiculo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VeiculoCreateManyArgs>(args?: SelectSubset<T, VeiculoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Veiculos and returns the data saved in the database.
     * @param {VeiculoCreateManyAndReturnArgs} args - Arguments to create many Veiculos.
     * @example
     * // Create many Veiculos
     * const veiculo = await prisma.veiculo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Veiculos and only return the `id`
     * const veiculoWithIdOnly = await prisma.veiculo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VeiculoCreateManyAndReturnArgs>(args?: SelectSubset<T, VeiculoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Veiculo.
     * @param {VeiculoDeleteArgs} args - Arguments to delete one Veiculo.
     * @example
     * // Delete one Veiculo
     * const Veiculo = await prisma.veiculo.delete({
     *   where: {
     *     // ... filter to delete one Veiculo
     *   }
     * })
     * 
     */
    delete<T extends VeiculoDeleteArgs>(args: SelectSubset<T, VeiculoDeleteArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Veiculo.
     * @param {VeiculoUpdateArgs} args - Arguments to update one Veiculo.
     * @example
     * // Update one Veiculo
     * const veiculo = await prisma.veiculo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VeiculoUpdateArgs>(args: SelectSubset<T, VeiculoUpdateArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Veiculos.
     * @param {VeiculoDeleteManyArgs} args - Arguments to filter Veiculos to delete.
     * @example
     * // Delete a few Veiculos
     * const { count } = await prisma.veiculo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VeiculoDeleteManyArgs>(args?: SelectSubset<T, VeiculoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Veiculos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Veiculos
     * const veiculo = await prisma.veiculo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VeiculoUpdateManyArgs>(args: SelectSubset<T, VeiculoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Veiculo.
     * @param {VeiculoUpsertArgs} args - Arguments to update or create a Veiculo.
     * @example
     * // Update or create a Veiculo
     * const veiculo = await prisma.veiculo.upsert({
     *   create: {
     *     // ... data to create a Veiculo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Veiculo we want to update
     *   }
     * })
     */
    upsert<T extends VeiculoUpsertArgs>(args: SelectSubset<T, VeiculoUpsertArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Veiculos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoCountArgs} args - Arguments to filter Veiculos to count.
     * @example
     * // Count the number of Veiculos
     * const count = await prisma.veiculo.count({
     *   where: {
     *     // ... the filter for the Veiculos we want to count
     *   }
     * })
    **/
    count<T extends VeiculoCountArgs>(
      args?: Subset<T, VeiculoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VeiculoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Veiculo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VeiculoAggregateArgs>(args: Subset<T, VeiculoAggregateArgs>): Prisma.PrismaPromise<GetVeiculoAggregateType<T>>

    /**
     * Group by Veiculo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VeiculoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VeiculoGroupByArgs['orderBy'] }
        : { orderBy?: VeiculoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VeiculoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVeiculoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Veiculo model
   */
  readonly fields: VeiculoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Veiculo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VeiculoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lancamentos<T extends Veiculo$lancamentosArgs<ExtArgs> = {}>(args?: Subset<T, Veiculo$lancamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Veiculo model
   */ 
  interface VeiculoFieldRefs {
    readonly id: FieldRef<"Veiculo", 'String'>
    readonly nome: FieldRef<"Veiculo", 'String'>
    readonly identificacao: FieldRef<"Veiculo", 'String'>
    readonly createdAt: FieldRef<"Veiculo", 'DateTime'>
    readonly updatedAt: FieldRef<"Veiculo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Veiculo findUnique
   */
  export type VeiculoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo findUniqueOrThrow
   */
  export type VeiculoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo findFirst
   */
  export type VeiculoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Veiculos.
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Veiculos.
     */
    distinct?: VeiculoScalarFieldEnum | VeiculoScalarFieldEnum[]
  }

  /**
   * Veiculo findFirstOrThrow
   */
  export type VeiculoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Veiculos.
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Veiculos.
     */
    distinct?: VeiculoScalarFieldEnum | VeiculoScalarFieldEnum[]
  }

  /**
   * Veiculo findMany
   */
  export type VeiculoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * Filter, which Veiculos to fetch.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Veiculos.
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    distinct?: VeiculoScalarFieldEnum | VeiculoScalarFieldEnum[]
  }

  /**
   * Veiculo create
   */
  export type VeiculoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * The data needed to create a Veiculo.
     */
    data: XOR<VeiculoCreateInput, VeiculoUncheckedCreateInput>
  }

  /**
   * Veiculo createMany
   */
  export type VeiculoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Veiculos.
     */
    data: VeiculoCreateManyInput | VeiculoCreateManyInput[]
  }

  /**
   * Veiculo createManyAndReturn
   */
  export type VeiculoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Veiculos.
     */
    data: VeiculoCreateManyInput | VeiculoCreateManyInput[]
  }

  /**
   * Veiculo update
   */
  export type VeiculoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * The data needed to update a Veiculo.
     */
    data: XOR<VeiculoUpdateInput, VeiculoUncheckedUpdateInput>
    /**
     * Choose, which Veiculo to update.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo updateMany
   */
  export type VeiculoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Veiculos.
     */
    data: XOR<VeiculoUpdateManyMutationInput, VeiculoUncheckedUpdateManyInput>
    /**
     * Filter which Veiculos to update
     */
    where?: VeiculoWhereInput
  }

  /**
   * Veiculo upsert
   */
  export type VeiculoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * The filter to search for the Veiculo to update in case it exists.
     */
    where: VeiculoWhereUniqueInput
    /**
     * In case the Veiculo found by the `where` argument doesn't exist, create a new Veiculo with this data.
     */
    create: XOR<VeiculoCreateInput, VeiculoUncheckedCreateInput>
    /**
     * In case the Veiculo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VeiculoUpdateInput, VeiculoUncheckedUpdateInput>
  }

  /**
   * Veiculo delete
   */
  export type VeiculoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    /**
     * Filter which Veiculo to delete.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo deleteMany
   */
  export type VeiculoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Veiculos to delete
     */
    where?: VeiculoWhereInput
  }

  /**
   * Veiculo.lancamentos
   */
  export type Veiculo$lancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    cursor?: LancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Veiculo without action
   */
  export type VeiculoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
  }


  /**
   * Model Colaborador
   */

  export type AggregateColaborador = {
    _count: ColaboradorCountAggregateOutputType | null
    _min: ColaboradorMinAggregateOutputType | null
    _max: ColaboradorMaxAggregateOutputType | null
  }

  export type ColaboradorMinAggregateOutputType = {
    id: string | null
    legacyId: string | null
    nome: string | null
    cpfCnpj: string | null
    cargo: string | null
    tipificacao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColaboradorMaxAggregateOutputType = {
    id: string | null
    legacyId: string | null
    nome: string | null
    cpfCnpj: string | null
    cargo: string | null
    tipificacao: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ColaboradorCountAggregateOutputType = {
    id: number
    legacyId: number
    nome: number
    cpfCnpj: number
    cargo: number
    tipificacao: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ColaboradorMinAggregateInputType = {
    id?: true
    legacyId?: true
    nome?: true
    cpfCnpj?: true
    cargo?: true
    tipificacao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColaboradorMaxAggregateInputType = {
    id?: true
    legacyId?: true
    nome?: true
    cpfCnpj?: true
    cargo?: true
    tipificacao?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ColaboradorCountAggregateInputType = {
    id?: true
    legacyId?: true
    nome?: true
    cpfCnpj?: true
    cargo?: true
    tipificacao?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ColaboradorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colaborador to aggregate.
     */
    where?: ColaboradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colaboradors to fetch.
     */
    orderBy?: ColaboradorOrderByWithRelationInput | ColaboradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColaboradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colaboradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colaboradors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Colaboradors
    **/
    _count?: true | ColaboradorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColaboradorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColaboradorMaxAggregateInputType
  }

  export type GetColaboradorAggregateType<T extends ColaboradorAggregateArgs> = {
        [P in keyof T & keyof AggregateColaborador]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColaborador[P]>
      : GetScalarType<T[P], AggregateColaborador[P]>
  }




  export type ColaboradorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColaboradorWhereInput
    orderBy?: ColaboradorOrderByWithAggregationInput | ColaboradorOrderByWithAggregationInput[]
    by: ColaboradorScalarFieldEnum[] | ColaboradorScalarFieldEnum
    having?: ColaboradorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColaboradorCountAggregateInputType | true
    _min?: ColaboradorMinAggregateInputType
    _max?: ColaboradorMaxAggregateInputType
  }

  export type ColaboradorGroupByOutputType = {
    id: string
    legacyId: string | null
    nome: string
    cpfCnpj: string | null
    cargo: string | null
    tipificacao: string | null
    createdAt: Date
    updatedAt: Date
    _count: ColaboradorCountAggregateOutputType | null
    _min: ColaboradorMinAggregateOutputType | null
    _max: ColaboradorMaxAggregateOutputType | null
  }

  type GetColaboradorGroupByPayload<T extends ColaboradorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColaboradorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColaboradorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColaboradorGroupByOutputType[P]>
            : GetScalarType<T[P], ColaboradorGroupByOutputType[P]>
        }
      >
    >


  export type ColaboradorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    legacyId?: boolean
    nome?: boolean
    cpfCnpj?: boolean
    cargo?: boolean
    tipificacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lancamentos?: boolean | Colaborador$lancamentosArgs<ExtArgs>
    _count?: boolean | ColaboradorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["colaborador"]>

  export type ColaboradorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    legacyId?: boolean
    nome?: boolean
    cpfCnpj?: boolean
    cargo?: boolean
    tipificacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["colaborador"]>

  export type ColaboradorSelectScalar = {
    id?: boolean
    legacyId?: boolean
    nome?: boolean
    cpfCnpj?: boolean
    cargo?: boolean
    tipificacao?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ColaboradorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamentos?: boolean | Colaborador$lancamentosArgs<ExtArgs>
    _count?: boolean | ColaboradorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ColaboradorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ColaboradorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Colaborador"
    objects: {
      lancamentos: Prisma.$LancamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      legacyId: string | null
      nome: string
      cpfCnpj: string | null
      cargo: string | null
      tipificacao: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["colaborador"]>
    composites: {}
  }

  type ColaboradorGetPayload<S extends boolean | null | undefined | ColaboradorDefaultArgs> = $Result.GetResult<Prisma.$ColaboradorPayload, S>

  type ColaboradorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ColaboradorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ColaboradorCountAggregateInputType | true
    }

  export interface ColaboradorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Colaborador'], meta: { name: 'Colaborador' } }
    /**
     * Find zero or one Colaborador that matches the filter.
     * @param {ColaboradorFindUniqueArgs} args - Arguments to find a Colaborador
     * @example
     * // Get one Colaborador
     * const colaborador = await prisma.colaborador.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColaboradorFindUniqueArgs>(args: SelectSubset<T, ColaboradorFindUniqueArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Colaborador that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ColaboradorFindUniqueOrThrowArgs} args - Arguments to find a Colaborador
     * @example
     * // Get one Colaborador
     * const colaborador = await prisma.colaborador.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColaboradorFindUniqueOrThrowArgs>(args: SelectSubset<T, ColaboradorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Colaborador that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaboradorFindFirstArgs} args - Arguments to find a Colaborador
     * @example
     * // Get one Colaborador
     * const colaborador = await prisma.colaborador.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColaboradorFindFirstArgs>(args?: SelectSubset<T, ColaboradorFindFirstArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Colaborador that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaboradorFindFirstOrThrowArgs} args - Arguments to find a Colaborador
     * @example
     * // Get one Colaborador
     * const colaborador = await prisma.colaborador.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColaboradorFindFirstOrThrowArgs>(args?: SelectSubset<T, ColaboradorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Colaboradors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaboradorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Colaboradors
     * const colaboradors = await prisma.colaborador.findMany()
     * 
     * // Get first 10 Colaboradors
     * const colaboradors = await prisma.colaborador.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const colaboradorWithIdOnly = await prisma.colaborador.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColaboradorFindManyArgs>(args?: SelectSubset<T, ColaboradorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Colaborador.
     * @param {ColaboradorCreateArgs} args - Arguments to create a Colaborador.
     * @example
     * // Create one Colaborador
     * const Colaborador = await prisma.colaborador.create({
     *   data: {
     *     // ... data to create a Colaborador
     *   }
     * })
     * 
     */
    create<T extends ColaboradorCreateArgs>(args: SelectSubset<T, ColaboradorCreateArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Colaboradors.
     * @param {ColaboradorCreateManyArgs} args - Arguments to create many Colaboradors.
     * @example
     * // Create many Colaboradors
     * const colaborador = await prisma.colaborador.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColaboradorCreateManyArgs>(args?: SelectSubset<T, ColaboradorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Colaboradors and returns the data saved in the database.
     * @param {ColaboradorCreateManyAndReturnArgs} args - Arguments to create many Colaboradors.
     * @example
     * // Create many Colaboradors
     * const colaborador = await prisma.colaborador.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Colaboradors and only return the `id`
     * const colaboradorWithIdOnly = await prisma.colaborador.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColaboradorCreateManyAndReturnArgs>(args?: SelectSubset<T, ColaboradorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Colaborador.
     * @param {ColaboradorDeleteArgs} args - Arguments to delete one Colaborador.
     * @example
     * // Delete one Colaborador
     * const Colaborador = await prisma.colaborador.delete({
     *   where: {
     *     // ... filter to delete one Colaborador
     *   }
     * })
     * 
     */
    delete<T extends ColaboradorDeleteArgs>(args: SelectSubset<T, ColaboradorDeleteArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Colaborador.
     * @param {ColaboradorUpdateArgs} args - Arguments to update one Colaborador.
     * @example
     * // Update one Colaborador
     * const colaborador = await prisma.colaborador.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColaboradorUpdateArgs>(args: SelectSubset<T, ColaboradorUpdateArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Colaboradors.
     * @param {ColaboradorDeleteManyArgs} args - Arguments to filter Colaboradors to delete.
     * @example
     * // Delete a few Colaboradors
     * const { count } = await prisma.colaborador.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColaboradorDeleteManyArgs>(args?: SelectSubset<T, ColaboradorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Colaboradors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaboradorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Colaboradors
     * const colaborador = await prisma.colaborador.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColaboradorUpdateManyArgs>(args: SelectSubset<T, ColaboradorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Colaborador.
     * @param {ColaboradorUpsertArgs} args - Arguments to update or create a Colaborador.
     * @example
     * // Update or create a Colaborador
     * const colaborador = await prisma.colaborador.upsert({
     *   create: {
     *     // ... data to create a Colaborador
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Colaborador we want to update
     *   }
     * })
     */
    upsert<T extends ColaboradorUpsertArgs>(args: SelectSubset<T, ColaboradorUpsertArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Colaboradors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaboradorCountArgs} args - Arguments to filter Colaboradors to count.
     * @example
     * // Count the number of Colaboradors
     * const count = await prisma.colaborador.count({
     *   where: {
     *     // ... the filter for the Colaboradors we want to count
     *   }
     * })
    **/
    count<T extends ColaboradorCountArgs>(
      args?: Subset<T, ColaboradorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColaboradorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Colaborador.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaboradorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColaboradorAggregateArgs>(args: Subset<T, ColaboradorAggregateArgs>): Prisma.PrismaPromise<GetColaboradorAggregateType<T>>

    /**
     * Group by Colaborador.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColaboradorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColaboradorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColaboradorGroupByArgs['orderBy'] }
        : { orderBy?: ColaboradorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColaboradorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColaboradorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Colaborador model
   */
  readonly fields: ColaboradorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Colaborador.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColaboradorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lancamentos<T extends Colaborador$lancamentosArgs<ExtArgs> = {}>(args?: Subset<T, Colaborador$lancamentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Colaborador model
   */ 
  interface ColaboradorFieldRefs {
    readonly id: FieldRef<"Colaborador", 'String'>
    readonly legacyId: FieldRef<"Colaborador", 'String'>
    readonly nome: FieldRef<"Colaborador", 'String'>
    readonly cpfCnpj: FieldRef<"Colaborador", 'String'>
    readonly cargo: FieldRef<"Colaborador", 'String'>
    readonly tipificacao: FieldRef<"Colaborador", 'String'>
    readonly createdAt: FieldRef<"Colaborador", 'DateTime'>
    readonly updatedAt: FieldRef<"Colaborador", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Colaborador findUnique
   */
  export type ColaboradorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * Filter, which Colaborador to fetch.
     */
    where: ColaboradorWhereUniqueInput
  }

  /**
   * Colaborador findUniqueOrThrow
   */
  export type ColaboradorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * Filter, which Colaborador to fetch.
     */
    where: ColaboradorWhereUniqueInput
  }

  /**
   * Colaborador findFirst
   */
  export type ColaboradorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * Filter, which Colaborador to fetch.
     */
    where?: ColaboradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colaboradors to fetch.
     */
    orderBy?: ColaboradorOrderByWithRelationInput | ColaboradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colaboradors.
     */
    cursor?: ColaboradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colaboradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colaboradors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colaboradors.
     */
    distinct?: ColaboradorScalarFieldEnum | ColaboradorScalarFieldEnum[]
  }

  /**
   * Colaborador findFirstOrThrow
   */
  export type ColaboradorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * Filter, which Colaborador to fetch.
     */
    where?: ColaboradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colaboradors to fetch.
     */
    orderBy?: ColaboradorOrderByWithRelationInput | ColaboradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Colaboradors.
     */
    cursor?: ColaboradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colaboradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colaboradors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Colaboradors.
     */
    distinct?: ColaboradorScalarFieldEnum | ColaboradorScalarFieldEnum[]
  }

  /**
   * Colaborador findMany
   */
  export type ColaboradorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * Filter, which Colaboradors to fetch.
     */
    where?: ColaboradorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Colaboradors to fetch.
     */
    orderBy?: ColaboradorOrderByWithRelationInput | ColaboradorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Colaboradors.
     */
    cursor?: ColaboradorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Colaboradors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Colaboradors.
     */
    skip?: number
    distinct?: ColaboradorScalarFieldEnum | ColaboradorScalarFieldEnum[]
  }

  /**
   * Colaborador create
   */
  export type ColaboradorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * The data needed to create a Colaborador.
     */
    data: XOR<ColaboradorCreateInput, ColaboradorUncheckedCreateInput>
  }

  /**
   * Colaborador createMany
   */
  export type ColaboradorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Colaboradors.
     */
    data: ColaboradorCreateManyInput | ColaboradorCreateManyInput[]
  }

  /**
   * Colaborador createManyAndReturn
   */
  export type ColaboradorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Colaboradors.
     */
    data: ColaboradorCreateManyInput | ColaboradorCreateManyInput[]
  }

  /**
   * Colaborador update
   */
  export type ColaboradorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * The data needed to update a Colaborador.
     */
    data: XOR<ColaboradorUpdateInput, ColaboradorUncheckedUpdateInput>
    /**
     * Choose, which Colaborador to update.
     */
    where: ColaboradorWhereUniqueInput
  }

  /**
   * Colaborador updateMany
   */
  export type ColaboradorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Colaboradors.
     */
    data: XOR<ColaboradorUpdateManyMutationInput, ColaboradorUncheckedUpdateManyInput>
    /**
     * Filter which Colaboradors to update
     */
    where?: ColaboradorWhereInput
  }

  /**
   * Colaborador upsert
   */
  export type ColaboradorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * The filter to search for the Colaborador to update in case it exists.
     */
    where: ColaboradorWhereUniqueInput
    /**
     * In case the Colaborador found by the `where` argument doesn't exist, create a new Colaborador with this data.
     */
    create: XOR<ColaboradorCreateInput, ColaboradorUncheckedCreateInput>
    /**
     * In case the Colaborador was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColaboradorUpdateInput, ColaboradorUncheckedUpdateInput>
  }

  /**
   * Colaborador delete
   */
  export type ColaboradorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    /**
     * Filter which Colaborador to delete.
     */
    where: ColaboradorWhereUniqueInput
  }

  /**
   * Colaborador deleteMany
   */
  export type ColaboradorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Colaboradors to delete
     */
    where?: ColaboradorWhereInput
  }

  /**
   * Colaborador.lancamentos
   */
  export type Colaborador$lancamentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    cursor?: LancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Colaborador without action
   */
  export type ColaboradorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
  }


  /**
   * Model Lancamento
   */

  export type AggregateLancamento = {
    _count: LancamentoCountAggregateOutputType | null
    _avg: LancamentoAvgAggregateOutputType | null
    _sum: LancamentoSumAggregateOutputType | null
    _min: LancamentoMinAggregateOutputType | null
    _max: LancamentoMaxAggregateOutputType | null
  }

  export type LancamentoAvgAggregateOutputType = {
    valor: number | null
    valorPagto: number | null
  }

  export type LancamentoSumAggregateOutputType = {
    valor: number | null
    valorPagto: number | null
  }

  export type LancamentoMinAggregateOutputType = {
    id: string | null
    appSheetId: string | null
    tipoLancamento: string | null
    clienteId: string | null
    agenciaId: string | null
    veiculoId: string | null
    colaboradorId: string | null
    numeroNotaFiscal: string | null
    dataEmissao: Date | null
    valor: number | null
    vencimento: Date | null
    descricao: string | null
    numeroPi: string | null
    numeroContrato: string | null
    mesAnoReferencia: string | null
    statusPagto: string | null
    statusCobranca: string | null
    statusNfe: string | null
    dataEnvio: Date | null
    valorPagto: number | null
    dataPagamento: Date | null
    dataEnvioNfe: Date | null
    canalCobranca: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LancamentoMaxAggregateOutputType = {
    id: string | null
    appSheetId: string | null
    tipoLancamento: string | null
    clienteId: string | null
    agenciaId: string | null
    veiculoId: string | null
    colaboradorId: string | null
    numeroNotaFiscal: string | null
    dataEmissao: Date | null
    valor: number | null
    vencimento: Date | null
    descricao: string | null
    numeroPi: string | null
    numeroContrato: string | null
    mesAnoReferencia: string | null
    statusPagto: string | null
    statusCobranca: string | null
    statusNfe: string | null
    dataEnvio: Date | null
    valorPagto: number | null
    dataPagamento: Date | null
    dataEnvioNfe: Date | null
    canalCobranca: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LancamentoCountAggregateOutputType = {
    id: number
    appSheetId: number
    tipoLancamento: number
    clienteId: number
    agenciaId: number
    veiculoId: number
    colaboradorId: number
    numeroNotaFiscal: number
    dataEmissao: number
    valor: number
    vencimento: number
    descricao: number
    numeroPi: number
    numeroContrato: number
    mesAnoReferencia: number
    statusPagto: number
    statusCobranca: number
    statusNfe: number
    dataEnvio: number
    valorPagto: number
    dataPagamento: number
    dataEnvioNfe: number
    canalCobranca: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LancamentoAvgAggregateInputType = {
    valor?: true
    valorPagto?: true
  }

  export type LancamentoSumAggregateInputType = {
    valor?: true
    valorPagto?: true
  }

  export type LancamentoMinAggregateInputType = {
    id?: true
    appSheetId?: true
    tipoLancamento?: true
    clienteId?: true
    agenciaId?: true
    veiculoId?: true
    colaboradorId?: true
    numeroNotaFiscal?: true
    dataEmissao?: true
    valor?: true
    vencimento?: true
    descricao?: true
    numeroPi?: true
    numeroContrato?: true
    mesAnoReferencia?: true
    statusPagto?: true
    statusCobranca?: true
    statusNfe?: true
    dataEnvio?: true
    valorPagto?: true
    dataPagamento?: true
    dataEnvioNfe?: true
    canalCobranca?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LancamentoMaxAggregateInputType = {
    id?: true
    appSheetId?: true
    tipoLancamento?: true
    clienteId?: true
    agenciaId?: true
    veiculoId?: true
    colaboradorId?: true
    numeroNotaFiscal?: true
    dataEmissao?: true
    valor?: true
    vencimento?: true
    descricao?: true
    numeroPi?: true
    numeroContrato?: true
    mesAnoReferencia?: true
    statusPagto?: true
    statusCobranca?: true
    statusNfe?: true
    dataEnvio?: true
    valorPagto?: true
    dataPagamento?: true
    dataEnvioNfe?: true
    canalCobranca?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LancamentoCountAggregateInputType = {
    id?: true
    appSheetId?: true
    tipoLancamento?: true
    clienteId?: true
    agenciaId?: true
    veiculoId?: true
    colaboradorId?: true
    numeroNotaFiscal?: true
    dataEmissao?: true
    valor?: true
    vencimento?: true
    descricao?: true
    numeroPi?: true
    numeroContrato?: true
    mesAnoReferencia?: true
    statusPagto?: true
    statusCobranca?: true
    statusNfe?: true
    dataEnvio?: true
    valorPagto?: true
    dataPagamento?: true
    dataEnvioNfe?: true
    canalCobranca?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LancamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lancamento to aggregate.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lancamentos
    **/
    _count?: true | LancamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LancamentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LancamentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LancamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LancamentoMaxAggregateInputType
  }

  export type GetLancamentoAggregateType<T extends LancamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateLancamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLancamento[P]>
      : GetScalarType<T[P], AggregateLancamento[P]>
  }




  export type LancamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LancamentoWhereInput
    orderBy?: LancamentoOrderByWithAggregationInput | LancamentoOrderByWithAggregationInput[]
    by: LancamentoScalarFieldEnum[] | LancamentoScalarFieldEnum
    having?: LancamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LancamentoCountAggregateInputType | true
    _avg?: LancamentoAvgAggregateInputType
    _sum?: LancamentoSumAggregateInputType
    _min?: LancamentoMinAggregateInputType
    _max?: LancamentoMaxAggregateInputType
  }

  export type LancamentoGroupByOutputType = {
    id: string
    appSheetId: string | null
    tipoLancamento: string
    clienteId: string | null
    agenciaId: string | null
    veiculoId: string | null
    colaboradorId: string | null
    numeroNotaFiscal: string | null
    dataEmissao: Date | null
    valor: number | null
    vencimento: Date | null
    descricao: string | null
    numeroPi: string | null
    numeroContrato: string | null
    mesAnoReferencia: string | null
    statusPagto: string | null
    statusCobranca: string | null
    statusNfe: string | null
    dataEnvio: Date | null
    valorPagto: number | null
    dataPagamento: Date | null
    dataEnvioNfe: Date | null
    canalCobranca: string | null
    createdAt: Date
    updatedAt: Date
    _count: LancamentoCountAggregateOutputType | null
    _avg: LancamentoAvgAggregateOutputType | null
    _sum: LancamentoSumAggregateOutputType | null
    _min: LancamentoMinAggregateOutputType | null
    _max: LancamentoMaxAggregateOutputType | null
  }

  type GetLancamentoGroupByPayload<T extends LancamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LancamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LancamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LancamentoGroupByOutputType[P]>
            : GetScalarType<T[P], LancamentoGroupByOutputType[P]>
        }
      >
    >


  export type LancamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appSheetId?: boolean
    tipoLancamento?: boolean
    clienteId?: boolean
    agenciaId?: boolean
    veiculoId?: boolean
    colaboradorId?: boolean
    numeroNotaFiscal?: boolean
    dataEmissao?: boolean
    valor?: boolean
    vencimento?: boolean
    descricao?: boolean
    numeroPi?: boolean
    numeroContrato?: boolean
    mesAnoReferencia?: boolean
    statusPagto?: boolean
    statusCobranca?: boolean
    statusNfe?: boolean
    dataEnvio?: boolean
    valorPagto?: boolean
    dataPagamento?: boolean
    dataEnvioNfe?: boolean
    canalCobranca?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | Lancamento$clienteArgs<ExtArgs>
    agencia?: boolean | Lancamento$agenciaArgs<ExtArgs>
    veiculo?: boolean | Lancamento$veiculoArgs<ExtArgs>
    colaborador?: boolean | Lancamento$colaboradorArgs<ExtArgs>
    documentos?: boolean | Lancamento$documentosArgs<ExtArgs>
    marcacoes?: boolean | Lancamento$marcacoesArgs<ExtArgs>
    historico?: boolean | Lancamento$historicoArgs<ExtArgs>
    _count?: boolean | LancamentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type LancamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appSheetId?: boolean
    tipoLancamento?: boolean
    clienteId?: boolean
    agenciaId?: boolean
    veiculoId?: boolean
    colaboradorId?: boolean
    numeroNotaFiscal?: boolean
    dataEmissao?: boolean
    valor?: boolean
    vencimento?: boolean
    descricao?: boolean
    numeroPi?: boolean
    numeroContrato?: boolean
    mesAnoReferencia?: boolean
    statusPagto?: boolean
    statusCobranca?: boolean
    statusNfe?: boolean
    dataEnvio?: boolean
    valorPagto?: boolean
    dataPagamento?: boolean
    dataEnvioNfe?: boolean
    canalCobranca?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | Lancamento$clienteArgs<ExtArgs>
    agencia?: boolean | Lancamento$agenciaArgs<ExtArgs>
    veiculo?: boolean | Lancamento$veiculoArgs<ExtArgs>
    colaborador?: boolean | Lancamento$colaboradorArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type LancamentoSelectScalar = {
    id?: boolean
    appSheetId?: boolean
    tipoLancamento?: boolean
    clienteId?: boolean
    agenciaId?: boolean
    veiculoId?: boolean
    colaboradorId?: boolean
    numeroNotaFiscal?: boolean
    dataEmissao?: boolean
    valor?: boolean
    vencimento?: boolean
    descricao?: boolean
    numeroPi?: boolean
    numeroContrato?: boolean
    mesAnoReferencia?: boolean
    statusPagto?: boolean
    statusCobranca?: boolean
    statusNfe?: boolean
    dataEnvio?: boolean
    valorPagto?: boolean
    dataPagamento?: boolean
    dataEnvioNfe?: boolean
    canalCobranca?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LancamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | Lancamento$clienteArgs<ExtArgs>
    agencia?: boolean | Lancamento$agenciaArgs<ExtArgs>
    veiculo?: boolean | Lancamento$veiculoArgs<ExtArgs>
    colaborador?: boolean | Lancamento$colaboradorArgs<ExtArgs>
    documentos?: boolean | Lancamento$documentosArgs<ExtArgs>
    marcacoes?: boolean | Lancamento$marcacoesArgs<ExtArgs>
    historico?: boolean | Lancamento$historicoArgs<ExtArgs>
    _count?: boolean | LancamentoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LancamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | Lancamento$clienteArgs<ExtArgs>
    agencia?: boolean | Lancamento$agenciaArgs<ExtArgs>
    veiculo?: boolean | Lancamento$veiculoArgs<ExtArgs>
    colaborador?: boolean | Lancamento$colaboradorArgs<ExtArgs>
  }

  export type $LancamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lancamento"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs> | null
      agencia: Prisma.$AgenciaPayload<ExtArgs> | null
      veiculo: Prisma.$VeiculoPayload<ExtArgs> | null
      colaborador: Prisma.$ColaboradorPayload<ExtArgs> | null
      documentos: Prisma.$DocumentoPayload<ExtArgs>[]
      marcacoes: Prisma.$MarcacaoComplementacaoPayload<ExtArgs>[]
      historico: Prisma.$HistoricoLancamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      appSheetId: string | null
      tipoLancamento: string
      clienteId: string | null
      agenciaId: string | null
      veiculoId: string | null
      colaboradorId: string | null
      numeroNotaFiscal: string | null
      dataEmissao: Date | null
      valor: number | null
      vencimento: Date | null
      descricao: string | null
      numeroPi: string | null
      numeroContrato: string | null
      mesAnoReferencia: string | null
      statusPagto: string | null
      statusCobranca: string | null
      statusNfe: string | null
      dataEnvio: Date | null
      valorPagto: number | null
      dataPagamento: Date | null
      dataEnvioNfe: Date | null
      canalCobranca: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lancamento"]>
    composites: {}
  }

  type LancamentoGetPayload<S extends boolean | null | undefined | LancamentoDefaultArgs> = $Result.GetResult<Prisma.$LancamentoPayload, S>

  type LancamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LancamentoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LancamentoCountAggregateInputType | true
    }

  export interface LancamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lancamento'], meta: { name: 'Lancamento' } }
    /**
     * Find zero or one Lancamento that matches the filter.
     * @param {LancamentoFindUniqueArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LancamentoFindUniqueArgs>(args: SelectSubset<T, LancamentoFindUniqueArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lancamento that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LancamentoFindUniqueOrThrowArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LancamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, LancamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lancamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFindFirstArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LancamentoFindFirstArgs>(args?: SelectSubset<T, LancamentoFindFirstArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lancamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFindFirstOrThrowArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LancamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, LancamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Lancamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lancamentos
     * const lancamentos = await prisma.lancamento.findMany()
     * 
     * // Get first 10 Lancamentos
     * const lancamentos = await prisma.lancamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LancamentoFindManyArgs>(args?: SelectSubset<T, LancamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lancamento.
     * @param {LancamentoCreateArgs} args - Arguments to create a Lancamento.
     * @example
     * // Create one Lancamento
     * const Lancamento = await prisma.lancamento.create({
     *   data: {
     *     // ... data to create a Lancamento
     *   }
     * })
     * 
     */
    create<T extends LancamentoCreateArgs>(args: SelectSubset<T, LancamentoCreateArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Lancamentos.
     * @param {LancamentoCreateManyArgs} args - Arguments to create many Lancamentos.
     * @example
     * // Create many Lancamentos
     * const lancamento = await prisma.lancamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LancamentoCreateManyArgs>(args?: SelectSubset<T, LancamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lancamentos and returns the data saved in the database.
     * @param {LancamentoCreateManyAndReturnArgs} args - Arguments to create many Lancamentos.
     * @example
     * // Create many Lancamentos
     * const lancamento = await prisma.lancamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lancamentos and only return the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LancamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, LancamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Lancamento.
     * @param {LancamentoDeleteArgs} args - Arguments to delete one Lancamento.
     * @example
     * // Delete one Lancamento
     * const Lancamento = await prisma.lancamento.delete({
     *   where: {
     *     // ... filter to delete one Lancamento
     *   }
     * })
     * 
     */
    delete<T extends LancamentoDeleteArgs>(args: SelectSubset<T, LancamentoDeleteArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lancamento.
     * @param {LancamentoUpdateArgs} args - Arguments to update one Lancamento.
     * @example
     * // Update one Lancamento
     * const lancamento = await prisma.lancamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LancamentoUpdateArgs>(args: SelectSubset<T, LancamentoUpdateArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Lancamentos.
     * @param {LancamentoDeleteManyArgs} args - Arguments to filter Lancamentos to delete.
     * @example
     * // Delete a few Lancamentos
     * const { count } = await prisma.lancamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LancamentoDeleteManyArgs>(args?: SelectSubset<T, LancamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lancamentos
     * const lancamento = await prisma.lancamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LancamentoUpdateManyArgs>(args: SelectSubset<T, LancamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lancamento.
     * @param {LancamentoUpsertArgs} args - Arguments to update or create a Lancamento.
     * @example
     * // Update or create a Lancamento
     * const lancamento = await prisma.lancamento.upsert({
     *   create: {
     *     // ... data to create a Lancamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lancamento we want to update
     *   }
     * })
     */
    upsert<T extends LancamentoUpsertArgs>(args: SelectSubset<T, LancamentoUpsertArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Lancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoCountArgs} args - Arguments to filter Lancamentos to count.
     * @example
     * // Count the number of Lancamentos
     * const count = await prisma.lancamento.count({
     *   where: {
     *     // ... the filter for the Lancamentos we want to count
     *   }
     * })
    **/
    count<T extends LancamentoCountArgs>(
      args?: Subset<T, LancamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LancamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LancamentoAggregateArgs>(args: Subset<T, LancamentoAggregateArgs>): Prisma.PrismaPromise<GetLancamentoAggregateType<T>>

    /**
     * Group by Lancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LancamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LancamentoGroupByArgs['orderBy'] }
        : { orderBy?: LancamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LancamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLancamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lancamento model
   */
  readonly fields: LancamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lancamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LancamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends Lancamento$clienteArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$clienteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    agencia<T extends Lancamento$agenciaArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$agenciaArgs<ExtArgs>>): Prisma__AgenciaClient<$Result.GetResult<Prisma.$AgenciaPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    veiculo<T extends Lancamento$veiculoArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$veiculoArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    colaborador<T extends Lancamento$colaboradorArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$colaboradorArgs<ExtArgs>>): Prisma__ColaboradorClient<$Result.GetResult<Prisma.$ColaboradorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    documentos<T extends Lancamento$documentosArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$documentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "findMany"> | Null>
    marcacoes<T extends Lancamento$marcacoesArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$marcacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "findMany"> | Null>
    historico<T extends Lancamento$historicoArgs<ExtArgs> = {}>(args?: Subset<T, Lancamento$historicoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lancamento model
   */ 
  interface LancamentoFieldRefs {
    readonly id: FieldRef<"Lancamento", 'String'>
    readonly appSheetId: FieldRef<"Lancamento", 'String'>
    readonly tipoLancamento: FieldRef<"Lancamento", 'String'>
    readonly clienteId: FieldRef<"Lancamento", 'String'>
    readonly agenciaId: FieldRef<"Lancamento", 'String'>
    readonly veiculoId: FieldRef<"Lancamento", 'String'>
    readonly colaboradorId: FieldRef<"Lancamento", 'String'>
    readonly numeroNotaFiscal: FieldRef<"Lancamento", 'String'>
    readonly dataEmissao: FieldRef<"Lancamento", 'DateTime'>
    readonly valor: FieldRef<"Lancamento", 'Float'>
    readonly vencimento: FieldRef<"Lancamento", 'DateTime'>
    readonly descricao: FieldRef<"Lancamento", 'String'>
    readonly numeroPi: FieldRef<"Lancamento", 'String'>
    readonly numeroContrato: FieldRef<"Lancamento", 'String'>
    readonly mesAnoReferencia: FieldRef<"Lancamento", 'String'>
    readonly statusPagto: FieldRef<"Lancamento", 'String'>
    readonly statusCobranca: FieldRef<"Lancamento", 'String'>
    readonly statusNfe: FieldRef<"Lancamento", 'String'>
    readonly dataEnvio: FieldRef<"Lancamento", 'DateTime'>
    readonly valorPagto: FieldRef<"Lancamento", 'Float'>
    readonly dataPagamento: FieldRef<"Lancamento", 'DateTime'>
    readonly dataEnvioNfe: FieldRef<"Lancamento", 'DateTime'>
    readonly canalCobranca: FieldRef<"Lancamento", 'String'>
    readonly createdAt: FieldRef<"Lancamento", 'DateTime'>
    readonly updatedAt: FieldRef<"Lancamento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lancamento findUnique
   */
  export type LancamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento findUniqueOrThrow
   */
  export type LancamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento findFirst
   */
  export type LancamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lancamentos.
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lancamentos.
     */
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Lancamento findFirstOrThrow
   */
  export type LancamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamento to fetch.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lancamentos.
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lancamentos.
     */
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Lancamento findMany
   */
  export type LancamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter, which Lancamentos to fetch.
     */
    where?: LancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lancamentos to fetch.
     */
    orderBy?: LancamentoOrderByWithRelationInput | LancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lancamentos.
     */
    cursor?: LancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lancamentos.
     */
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * Lancamento create
   */
  export type LancamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Lancamento.
     */
    data: XOR<LancamentoCreateInput, LancamentoUncheckedCreateInput>
  }

  /**
   * Lancamento createMany
   */
  export type LancamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lancamentos.
     */
    data: LancamentoCreateManyInput | LancamentoCreateManyInput[]
  }

  /**
   * Lancamento createManyAndReturn
   */
  export type LancamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Lancamentos.
     */
    data: LancamentoCreateManyInput | LancamentoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lancamento update
   */
  export type LancamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Lancamento.
     */
    data: XOR<LancamentoUpdateInput, LancamentoUncheckedUpdateInput>
    /**
     * Choose, which Lancamento to update.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento updateMany
   */
  export type LancamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lancamentos.
     */
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyInput>
    /**
     * Filter which Lancamentos to update
     */
    where?: LancamentoWhereInput
  }

  /**
   * Lancamento upsert
   */
  export type LancamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Lancamento to update in case it exists.
     */
    where: LancamentoWhereUniqueInput
    /**
     * In case the Lancamento found by the `where` argument doesn't exist, create a new Lancamento with this data.
     */
    create: XOR<LancamentoCreateInput, LancamentoUncheckedCreateInput>
    /**
     * In case the Lancamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LancamentoUpdateInput, LancamentoUncheckedUpdateInput>
  }

  /**
   * Lancamento delete
   */
  export type LancamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
    /**
     * Filter which Lancamento to delete.
     */
    where: LancamentoWhereUniqueInput
  }

  /**
   * Lancamento deleteMany
   */
  export type LancamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lancamentos to delete
     */
    where?: LancamentoWhereInput
  }

  /**
   * Lancamento.cliente
   */
  export type Lancamento$clienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    where?: ClienteWhereInput
  }

  /**
   * Lancamento.agencia
   */
  export type Lancamento$agenciaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agencia
     */
    select?: AgenciaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgenciaInclude<ExtArgs> | null
    where?: AgenciaWhereInput
  }

  /**
   * Lancamento.veiculo
   */
  export type Lancamento$veiculoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VeiculoInclude<ExtArgs> | null
    where?: VeiculoWhereInput
  }

  /**
   * Lancamento.colaborador
   */
  export type Lancamento$colaboradorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Colaborador
     */
    select?: ColaboradorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColaboradorInclude<ExtArgs> | null
    where?: ColaboradorWhereInput
  }

  /**
   * Lancamento.documentos
   */
  export type Lancamento$documentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    where?: DocumentoWhereInput
    orderBy?: DocumentoOrderByWithRelationInput | DocumentoOrderByWithRelationInput[]
    cursor?: DocumentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentoScalarFieldEnum | DocumentoScalarFieldEnum[]
  }

  /**
   * Lancamento.marcacoes
   */
  export type Lancamento$marcacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    where?: MarcacaoComplementacaoWhereInput
    orderBy?: MarcacaoComplementacaoOrderByWithRelationInput | MarcacaoComplementacaoOrderByWithRelationInput[]
    cursor?: MarcacaoComplementacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MarcacaoComplementacaoScalarFieldEnum | MarcacaoComplementacaoScalarFieldEnum[]
  }

  /**
   * Lancamento.historico
   */
  export type Lancamento$historicoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    where?: HistoricoLancamentoWhereInput
    orderBy?: HistoricoLancamentoOrderByWithRelationInput | HistoricoLancamentoOrderByWithRelationInput[]
    cursor?: HistoricoLancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HistoricoLancamentoScalarFieldEnum | HistoricoLancamentoScalarFieldEnum[]
  }

  /**
   * Lancamento without action
   */
  export type LancamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lancamento
     */
    select?: LancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LancamentoInclude<ExtArgs> | null
  }


  /**
   * Model TipoDocumento
   */

  export type AggregateTipoDocumento = {
    _count: TipoDocumentoCountAggregateOutputType | null
    _min: TipoDocumentoMinAggregateOutputType | null
    _max: TipoDocumentoMaxAggregateOutputType | null
  }

  export type TipoDocumentoMinAggregateOutputType = {
    id: string | null
    nome: string | null
    icone: string | null
  }

  export type TipoDocumentoMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    icone: string | null
  }

  export type TipoDocumentoCountAggregateOutputType = {
    id: number
    nome: number
    icone: number
    _all: number
  }


  export type TipoDocumentoMinAggregateInputType = {
    id?: true
    nome?: true
    icone?: true
  }

  export type TipoDocumentoMaxAggregateInputType = {
    id?: true
    nome?: true
    icone?: true
  }

  export type TipoDocumentoCountAggregateInputType = {
    id?: true
    nome?: true
    icone?: true
    _all?: true
  }

  export type TipoDocumentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipoDocumento to aggregate.
     */
    where?: TipoDocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoDocumentos to fetch.
     */
    orderBy?: TipoDocumentoOrderByWithRelationInput | TipoDocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TipoDocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoDocumentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoDocumentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TipoDocumentos
    **/
    _count?: true | TipoDocumentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TipoDocumentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TipoDocumentoMaxAggregateInputType
  }

  export type GetTipoDocumentoAggregateType<T extends TipoDocumentoAggregateArgs> = {
        [P in keyof T & keyof AggregateTipoDocumento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipoDocumento[P]>
      : GetScalarType<T[P], AggregateTipoDocumento[P]>
  }




  export type TipoDocumentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TipoDocumentoWhereInput
    orderBy?: TipoDocumentoOrderByWithAggregationInput | TipoDocumentoOrderByWithAggregationInput[]
    by: TipoDocumentoScalarFieldEnum[] | TipoDocumentoScalarFieldEnum
    having?: TipoDocumentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TipoDocumentoCountAggregateInputType | true
    _min?: TipoDocumentoMinAggregateInputType
    _max?: TipoDocumentoMaxAggregateInputType
  }

  export type TipoDocumentoGroupByOutputType = {
    id: string
    nome: string
    icone: string | null
    _count: TipoDocumentoCountAggregateOutputType | null
    _min: TipoDocumentoMinAggregateOutputType | null
    _max: TipoDocumentoMaxAggregateOutputType | null
  }

  type GetTipoDocumentoGroupByPayload<T extends TipoDocumentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TipoDocumentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TipoDocumentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TipoDocumentoGroupByOutputType[P]>
            : GetScalarType<T[P], TipoDocumentoGroupByOutputType[P]>
        }
      >
    >


  export type TipoDocumentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    icone?: boolean
    documentos?: boolean | TipoDocumento$documentosArgs<ExtArgs>
    _count?: boolean | TipoDocumentoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tipoDocumento"]>

  export type TipoDocumentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    icone?: boolean
  }, ExtArgs["result"]["tipoDocumento"]>

  export type TipoDocumentoSelectScalar = {
    id?: boolean
    nome?: boolean
    icone?: boolean
  }

  export type TipoDocumentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documentos?: boolean | TipoDocumento$documentosArgs<ExtArgs>
    _count?: boolean | TipoDocumentoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TipoDocumentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TipoDocumentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TipoDocumento"
    objects: {
      documentos: Prisma.$DocumentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      icone: string | null
    }, ExtArgs["result"]["tipoDocumento"]>
    composites: {}
  }

  type TipoDocumentoGetPayload<S extends boolean | null | undefined | TipoDocumentoDefaultArgs> = $Result.GetResult<Prisma.$TipoDocumentoPayload, S>

  type TipoDocumentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TipoDocumentoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TipoDocumentoCountAggregateInputType | true
    }

  export interface TipoDocumentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TipoDocumento'], meta: { name: 'TipoDocumento' } }
    /**
     * Find zero or one TipoDocumento that matches the filter.
     * @param {TipoDocumentoFindUniqueArgs} args - Arguments to find a TipoDocumento
     * @example
     * // Get one TipoDocumento
     * const tipoDocumento = await prisma.tipoDocumento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TipoDocumentoFindUniqueArgs>(args: SelectSubset<T, TipoDocumentoFindUniqueArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TipoDocumento that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TipoDocumentoFindUniqueOrThrowArgs} args - Arguments to find a TipoDocumento
     * @example
     * // Get one TipoDocumento
     * const tipoDocumento = await prisma.tipoDocumento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TipoDocumentoFindUniqueOrThrowArgs>(args: SelectSubset<T, TipoDocumentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TipoDocumento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoDocumentoFindFirstArgs} args - Arguments to find a TipoDocumento
     * @example
     * // Get one TipoDocumento
     * const tipoDocumento = await prisma.tipoDocumento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TipoDocumentoFindFirstArgs>(args?: SelectSubset<T, TipoDocumentoFindFirstArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TipoDocumento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoDocumentoFindFirstOrThrowArgs} args - Arguments to find a TipoDocumento
     * @example
     * // Get one TipoDocumento
     * const tipoDocumento = await prisma.tipoDocumento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TipoDocumentoFindFirstOrThrowArgs>(args?: SelectSubset<T, TipoDocumentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TipoDocumentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoDocumentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TipoDocumentos
     * const tipoDocumentos = await prisma.tipoDocumento.findMany()
     * 
     * // Get first 10 TipoDocumentos
     * const tipoDocumentos = await prisma.tipoDocumento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tipoDocumentoWithIdOnly = await prisma.tipoDocumento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TipoDocumentoFindManyArgs>(args?: SelectSubset<T, TipoDocumentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TipoDocumento.
     * @param {TipoDocumentoCreateArgs} args - Arguments to create a TipoDocumento.
     * @example
     * // Create one TipoDocumento
     * const TipoDocumento = await prisma.tipoDocumento.create({
     *   data: {
     *     // ... data to create a TipoDocumento
     *   }
     * })
     * 
     */
    create<T extends TipoDocumentoCreateArgs>(args: SelectSubset<T, TipoDocumentoCreateArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TipoDocumentos.
     * @param {TipoDocumentoCreateManyArgs} args - Arguments to create many TipoDocumentos.
     * @example
     * // Create many TipoDocumentos
     * const tipoDocumento = await prisma.tipoDocumento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TipoDocumentoCreateManyArgs>(args?: SelectSubset<T, TipoDocumentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TipoDocumentos and returns the data saved in the database.
     * @param {TipoDocumentoCreateManyAndReturnArgs} args - Arguments to create many TipoDocumentos.
     * @example
     * // Create many TipoDocumentos
     * const tipoDocumento = await prisma.tipoDocumento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TipoDocumentos and only return the `id`
     * const tipoDocumentoWithIdOnly = await prisma.tipoDocumento.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TipoDocumentoCreateManyAndReturnArgs>(args?: SelectSubset<T, TipoDocumentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TipoDocumento.
     * @param {TipoDocumentoDeleteArgs} args - Arguments to delete one TipoDocumento.
     * @example
     * // Delete one TipoDocumento
     * const TipoDocumento = await prisma.tipoDocumento.delete({
     *   where: {
     *     // ... filter to delete one TipoDocumento
     *   }
     * })
     * 
     */
    delete<T extends TipoDocumentoDeleteArgs>(args: SelectSubset<T, TipoDocumentoDeleteArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TipoDocumento.
     * @param {TipoDocumentoUpdateArgs} args - Arguments to update one TipoDocumento.
     * @example
     * // Update one TipoDocumento
     * const tipoDocumento = await prisma.tipoDocumento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TipoDocumentoUpdateArgs>(args: SelectSubset<T, TipoDocumentoUpdateArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TipoDocumentos.
     * @param {TipoDocumentoDeleteManyArgs} args - Arguments to filter TipoDocumentos to delete.
     * @example
     * // Delete a few TipoDocumentos
     * const { count } = await prisma.tipoDocumento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TipoDocumentoDeleteManyArgs>(args?: SelectSubset<T, TipoDocumentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TipoDocumentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoDocumentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TipoDocumentos
     * const tipoDocumento = await prisma.tipoDocumento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TipoDocumentoUpdateManyArgs>(args: SelectSubset<T, TipoDocumentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TipoDocumento.
     * @param {TipoDocumentoUpsertArgs} args - Arguments to update or create a TipoDocumento.
     * @example
     * // Update or create a TipoDocumento
     * const tipoDocumento = await prisma.tipoDocumento.upsert({
     *   create: {
     *     // ... data to create a TipoDocumento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TipoDocumento we want to update
     *   }
     * })
     */
    upsert<T extends TipoDocumentoUpsertArgs>(args: SelectSubset<T, TipoDocumentoUpsertArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TipoDocumentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoDocumentoCountArgs} args - Arguments to filter TipoDocumentos to count.
     * @example
     * // Count the number of TipoDocumentos
     * const count = await prisma.tipoDocumento.count({
     *   where: {
     *     // ... the filter for the TipoDocumentos we want to count
     *   }
     * })
    **/
    count<T extends TipoDocumentoCountArgs>(
      args?: Subset<T, TipoDocumentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TipoDocumentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TipoDocumento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoDocumentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TipoDocumentoAggregateArgs>(args: Subset<T, TipoDocumentoAggregateArgs>): Prisma.PrismaPromise<GetTipoDocumentoAggregateType<T>>

    /**
     * Group by TipoDocumento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TipoDocumentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TipoDocumentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TipoDocumentoGroupByArgs['orderBy'] }
        : { orderBy?: TipoDocumentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TipoDocumentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipoDocumentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TipoDocumento model
   */
  readonly fields: TipoDocumentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TipoDocumento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TipoDocumentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documentos<T extends TipoDocumento$documentosArgs<ExtArgs> = {}>(args?: Subset<T, TipoDocumento$documentosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TipoDocumento model
   */ 
  interface TipoDocumentoFieldRefs {
    readonly id: FieldRef<"TipoDocumento", 'String'>
    readonly nome: FieldRef<"TipoDocumento", 'String'>
    readonly icone: FieldRef<"TipoDocumento", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TipoDocumento findUnique
   */
  export type TipoDocumentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * Filter, which TipoDocumento to fetch.
     */
    where: TipoDocumentoWhereUniqueInput
  }

  /**
   * TipoDocumento findUniqueOrThrow
   */
  export type TipoDocumentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * Filter, which TipoDocumento to fetch.
     */
    where: TipoDocumentoWhereUniqueInput
  }

  /**
   * TipoDocumento findFirst
   */
  export type TipoDocumentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * Filter, which TipoDocumento to fetch.
     */
    where?: TipoDocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoDocumentos to fetch.
     */
    orderBy?: TipoDocumentoOrderByWithRelationInput | TipoDocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipoDocumentos.
     */
    cursor?: TipoDocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoDocumentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoDocumentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoDocumentos.
     */
    distinct?: TipoDocumentoScalarFieldEnum | TipoDocumentoScalarFieldEnum[]
  }

  /**
   * TipoDocumento findFirstOrThrow
   */
  export type TipoDocumentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * Filter, which TipoDocumento to fetch.
     */
    where?: TipoDocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoDocumentos to fetch.
     */
    orderBy?: TipoDocumentoOrderByWithRelationInput | TipoDocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TipoDocumentos.
     */
    cursor?: TipoDocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoDocumentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoDocumentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TipoDocumentos.
     */
    distinct?: TipoDocumentoScalarFieldEnum | TipoDocumentoScalarFieldEnum[]
  }

  /**
   * TipoDocumento findMany
   */
  export type TipoDocumentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * Filter, which TipoDocumentos to fetch.
     */
    where?: TipoDocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TipoDocumentos to fetch.
     */
    orderBy?: TipoDocumentoOrderByWithRelationInput | TipoDocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TipoDocumentos.
     */
    cursor?: TipoDocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TipoDocumentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TipoDocumentos.
     */
    skip?: number
    distinct?: TipoDocumentoScalarFieldEnum | TipoDocumentoScalarFieldEnum[]
  }

  /**
   * TipoDocumento create
   */
  export type TipoDocumentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * The data needed to create a TipoDocumento.
     */
    data: XOR<TipoDocumentoCreateInput, TipoDocumentoUncheckedCreateInput>
  }

  /**
   * TipoDocumento createMany
   */
  export type TipoDocumentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TipoDocumentos.
     */
    data: TipoDocumentoCreateManyInput | TipoDocumentoCreateManyInput[]
  }

  /**
   * TipoDocumento createManyAndReturn
   */
  export type TipoDocumentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TipoDocumentos.
     */
    data: TipoDocumentoCreateManyInput | TipoDocumentoCreateManyInput[]
  }

  /**
   * TipoDocumento update
   */
  export type TipoDocumentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * The data needed to update a TipoDocumento.
     */
    data: XOR<TipoDocumentoUpdateInput, TipoDocumentoUncheckedUpdateInput>
    /**
     * Choose, which TipoDocumento to update.
     */
    where: TipoDocumentoWhereUniqueInput
  }

  /**
   * TipoDocumento updateMany
   */
  export type TipoDocumentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TipoDocumentos.
     */
    data: XOR<TipoDocumentoUpdateManyMutationInput, TipoDocumentoUncheckedUpdateManyInput>
    /**
     * Filter which TipoDocumentos to update
     */
    where?: TipoDocumentoWhereInput
  }

  /**
   * TipoDocumento upsert
   */
  export type TipoDocumentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * The filter to search for the TipoDocumento to update in case it exists.
     */
    where: TipoDocumentoWhereUniqueInput
    /**
     * In case the TipoDocumento found by the `where` argument doesn't exist, create a new TipoDocumento with this data.
     */
    create: XOR<TipoDocumentoCreateInput, TipoDocumentoUncheckedCreateInput>
    /**
     * In case the TipoDocumento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TipoDocumentoUpdateInput, TipoDocumentoUncheckedUpdateInput>
  }

  /**
   * TipoDocumento delete
   */
  export type TipoDocumentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
    /**
     * Filter which TipoDocumento to delete.
     */
    where: TipoDocumentoWhereUniqueInput
  }

  /**
   * TipoDocumento deleteMany
   */
  export type TipoDocumentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TipoDocumentos to delete
     */
    where?: TipoDocumentoWhereInput
  }

  /**
   * TipoDocumento.documentos
   */
  export type TipoDocumento$documentosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    where?: DocumentoWhereInput
    orderBy?: DocumentoOrderByWithRelationInput | DocumentoOrderByWithRelationInput[]
    cursor?: DocumentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentoScalarFieldEnum | DocumentoScalarFieldEnum[]
  }

  /**
   * TipoDocumento without action
   */
  export type TipoDocumentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TipoDocumento
     */
    select?: TipoDocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TipoDocumentoInclude<ExtArgs> | null
  }


  /**
   * Model Documento
   */

  export type AggregateDocumento = {
    _count: DocumentoCountAggregateOutputType | null
    _avg: DocumentoAvgAggregateOutputType | null
    _sum: DocumentoSumAggregateOutputType | null
    _min: DocumentoMinAggregateOutputType | null
    _max: DocumentoMaxAggregateOutputType | null
  }

  export type DocumentoAvgAggregateOutputType = {
    tamanhoBytes: number | null
  }

  export type DocumentoSumAggregateOutputType = {
    tamanhoBytes: number | null
  }

  export type DocumentoMinAggregateOutputType = {
    id: string | null
    lancamentoId: string | null
    tipoDocumentoId: string | null
    caminhoOriginal: string | null
    nomeOriginal: string | null
    colunaOrigem: string | null
    planilhaOrigem: string | null
    tamanhoBytes: number | null
    dataDocumento: Date | null
    dataInclusao: Date | null
    observacao: string | null
    usuarioResponsavel: string | null
    urlPublica: string | null
    deletarApos: Date | null
    status: string | null
  }

  export type DocumentoMaxAggregateOutputType = {
    id: string | null
    lancamentoId: string | null
    tipoDocumentoId: string | null
    caminhoOriginal: string | null
    nomeOriginal: string | null
    colunaOrigem: string | null
    planilhaOrigem: string | null
    tamanhoBytes: number | null
    dataDocumento: Date | null
    dataInclusao: Date | null
    observacao: string | null
    usuarioResponsavel: string | null
    urlPublica: string | null
    deletarApos: Date | null
    status: string | null
  }

  export type DocumentoCountAggregateOutputType = {
    id: number
    lancamentoId: number
    tipoDocumentoId: number
    caminhoOriginal: number
    nomeOriginal: number
    colunaOrigem: number
    planilhaOrigem: number
    tamanhoBytes: number
    dataDocumento: number
    dataInclusao: number
    observacao: number
    usuarioResponsavel: number
    urlPublica: number
    deletarApos: number
    status: number
    _all: number
  }


  export type DocumentoAvgAggregateInputType = {
    tamanhoBytes?: true
  }

  export type DocumentoSumAggregateInputType = {
    tamanhoBytes?: true
  }

  export type DocumentoMinAggregateInputType = {
    id?: true
    lancamentoId?: true
    tipoDocumentoId?: true
    caminhoOriginal?: true
    nomeOriginal?: true
    colunaOrigem?: true
    planilhaOrigem?: true
    tamanhoBytes?: true
    dataDocumento?: true
    dataInclusao?: true
    observacao?: true
    usuarioResponsavel?: true
    urlPublica?: true
    deletarApos?: true
    status?: true
  }

  export type DocumentoMaxAggregateInputType = {
    id?: true
    lancamentoId?: true
    tipoDocumentoId?: true
    caminhoOriginal?: true
    nomeOriginal?: true
    colunaOrigem?: true
    planilhaOrigem?: true
    tamanhoBytes?: true
    dataDocumento?: true
    dataInclusao?: true
    observacao?: true
    usuarioResponsavel?: true
    urlPublica?: true
    deletarApos?: true
    status?: true
  }

  export type DocumentoCountAggregateInputType = {
    id?: true
    lancamentoId?: true
    tipoDocumentoId?: true
    caminhoOriginal?: true
    nomeOriginal?: true
    colunaOrigem?: true
    planilhaOrigem?: true
    tamanhoBytes?: true
    dataDocumento?: true
    dataInclusao?: true
    observacao?: true
    usuarioResponsavel?: true
    urlPublica?: true
    deletarApos?: true
    status?: true
    _all?: true
  }

  export type DocumentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documento to aggregate.
     */
    where?: DocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documentos to fetch.
     */
    orderBy?: DocumentoOrderByWithRelationInput | DocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documentos
    **/
    _count?: true | DocumentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentoMaxAggregateInputType
  }

  export type GetDocumentoAggregateType<T extends DocumentoAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumento[P]>
      : GetScalarType<T[P], AggregateDocumento[P]>
  }




  export type DocumentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentoWhereInput
    orderBy?: DocumentoOrderByWithAggregationInput | DocumentoOrderByWithAggregationInput[]
    by: DocumentoScalarFieldEnum[] | DocumentoScalarFieldEnum
    having?: DocumentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentoCountAggregateInputType | true
    _avg?: DocumentoAvgAggregateInputType
    _sum?: DocumentoSumAggregateInputType
    _min?: DocumentoMinAggregateInputType
    _max?: DocumentoMaxAggregateInputType
  }

  export type DocumentoGroupByOutputType = {
    id: string
    lancamentoId: string
    tipoDocumentoId: string
    caminhoOriginal: string | null
    nomeOriginal: string
    colunaOrigem: string | null
    planilhaOrigem: string | null
    tamanhoBytes: number
    dataDocumento: Date | null
    dataInclusao: Date
    observacao: string | null
    usuarioResponsavel: string | null
    urlPublica: string | null
    deletarApos: Date | null
    status: string
    _count: DocumentoCountAggregateOutputType | null
    _avg: DocumentoAvgAggregateOutputType | null
    _sum: DocumentoSumAggregateOutputType | null
    _min: DocumentoMinAggregateOutputType | null
    _max: DocumentoMaxAggregateOutputType | null
  }

  type GetDocumentoGroupByPayload<T extends DocumentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentoGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentoGroupByOutputType[P]>
        }
      >
    >


  export type DocumentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lancamentoId?: boolean
    tipoDocumentoId?: boolean
    caminhoOriginal?: boolean
    nomeOriginal?: boolean
    colunaOrigem?: boolean
    planilhaOrigem?: boolean
    tamanhoBytes?: boolean
    dataDocumento?: boolean
    dataInclusao?: boolean
    observacao?: boolean
    usuarioResponsavel?: boolean
    urlPublica?: boolean
    deletarApos?: boolean
    status?: boolean
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
    tipoDocumento?: boolean | TipoDocumentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documento"]>

  export type DocumentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lancamentoId?: boolean
    tipoDocumentoId?: boolean
    caminhoOriginal?: boolean
    nomeOriginal?: boolean
    colunaOrigem?: boolean
    planilhaOrigem?: boolean
    tamanhoBytes?: boolean
    dataDocumento?: boolean
    dataInclusao?: boolean
    observacao?: boolean
    usuarioResponsavel?: boolean
    urlPublica?: boolean
    deletarApos?: boolean
    status?: boolean
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
    tipoDocumento?: boolean | TipoDocumentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documento"]>

  export type DocumentoSelectScalar = {
    id?: boolean
    lancamentoId?: boolean
    tipoDocumentoId?: boolean
    caminhoOriginal?: boolean
    nomeOriginal?: boolean
    colunaOrigem?: boolean
    planilhaOrigem?: boolean
    tamanhoBytes?: boolean
    dataDocumento?: boolean
    dataInclusao?: boolean
    observacao?: boolean
    usuarioResponsavel?: boolean
    urlPublica?: boolean
    deletarApos?: boolean
    status?: boolean
  }

  export type DocumentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
    tipoDocumento?: boolean | TipoDocumentoDefaultArgs<ExtArgs>
  }
  export type DocumentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
    tipoDocumento?: boolean | TipoDocumentoDefaultArgs<ExtArgs>
  }

  export type $DocumentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Documento"
    objects: {
      lancamento: Prisma.$LancamentoPayload<ExtArgs>
      tipoDocumento: Prisma.$TipoDocumentoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lancamentoId: string
      tipoDocumentoId: string
      caminhoOriginal: string | null
      nomeOriginal: string
      colunaOrigem: string | null
      planilhaOrigem: string | null
      tamanhoBytes: number
      dataDocumento: Date | null
      dataInclusao: Date
      observacao: string | null
      usuarioResponsavel: string | null
      urlPublica: string | null
      deletarApos: Date | null
      status: string
    }, ExtArgs["result"]["documento"]>
    composites: {}
  }

  type DocumentoGetPayload<S extends boolean | null | undefined | DocumentoDefaultArgs> = $Result.GetResult<Prisma.$DocumentoPayload, S>

  type DocumentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentoCountAggregateInputType | true
    }

  export interface DocumentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Documento'], meta: { name: 'Documento' } }
    /**
     * Find zero or one Documento that matches the filter.
     * @param {DocumentoFindUniqueArgs} args - Arguments to find a Documento
     * @example
     * // Get one Documento
     * const documento = await prisma.documento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentoFindUniqueArgs>(args: SelectSubset<T, DocumentoFindUniqueArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Documento that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentoFindUniqueOrThrowArgs} args - Arguments to find a Documento
     * @example
     * // Get one Documento
     * const documento = await prisma.documento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentoFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Documento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFindFirstArgs} args - Arguments to find a Documento
     * @example
     * // Get one Documento
     * const documento = await prisma.documento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentoFindFirstArgs>(args?: SelectSubset<T, DocumentoFindFirstArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Documento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFindFirstOrThrowArgs} args - Arguments to find a Documento
     * @example
     * // Get one Documento
     * const documento = await prisma.documento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentoFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Documentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documentos
     * const documentos = await prisma.documento.findMany()
     * 
     * // Get first 10 Documentos
     * const documentos = await prisma.documento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentoWithIdOnly = await prisma.documento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentoFindManyArgs>(args?: SelectSubset<T, DocumentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Documento.
     * @param {DocumentoCreateArgs} args - Arguments to create a Documento.
     * @example
     * // Create one Documento
     * const Documento = await prisma.documento.create({
     *   data: {
     *     // ... data to create a Documento
     *   }
     * })
     * 
     */
    create<T extends DocumentoCreateArgs>(args: SelectSubset<T, DocumentoCreateArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Documentos.
     * @param {DocumentoCreateManyArgs} args - Arguments to create many Documentos.
     * @example
     * // Create many Documentos
     * const documento = await prisma.documento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentoCreateManyArgs>(args?: SelectSubset<T, DocumentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documentos and returns the data saved in the database.
     * @param {DocumentoCreateManyAndReturnArgs} args - Arguments to create many Documentos.
     * @example
     * // Create many Documentos
     * const documento = await prisma.documento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documentos and only return the `id`
     * const documentoWithIdOnly = await prisma.documento.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentoCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Documento.
     * @param {DocumentoDeleteArgs} args - Arguments to delete one Documento.
     * @example
     * // Delete one Documento
     * const Documento = await prisma.documento.delete({
     *   where: {
     *     // ... filter to delete one Documento
     *   }
     * })
     * 
     */
    delete<T extends DocumentoDeleteArgs>(args: SelectSubset<T, DocumentoDeleteArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Documento.
     * @param {DocumentoUpdateArgs} args - Arguments to update one Documento.
     * @example
     * // Update one Documento
     * const documento = await prisma.documento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentoUpdateArgs>(args: SelectSubset<T, DocumentoUpdateArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Documentos.
     * @param {DocumentoDeleteManyArgs} args - Arguments to filter Documentos to delete.
     * @example
     * // Delete a few Documentos
     * const { count } = await prisma.documento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentoDeleteManyArgs>(args?: SelectSubset<T, DocumentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documentos
     * const documento = await prisma.documento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentoUpdateManyArgs>(args: SelectSubset<T, DocumentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Documento.
     * @param {DocumentoUpsertArgs} args - Arguments to update or create a Documento.
     * @example
     * // Update or create a Documento
     * const documento = await prisma.documento.upsert({
     *   create: {
     *     // ... data to create a Documento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Documento we want to update
     *   }
     * })
     */
    upsert<T extends DocumentoUpsertArgs>(args: SelectSubset<T, DocumentoUpsertArgs<ExtArgs>>): Prisma__DocumentoClient<$Result.GetResult<Prisma.$DocumentoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Documentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoCountArgs} args - Arguments to filter Documentos to count.
     * @example
     * // Count the number of Documentos
     * const count = await prisma.documento.count({
     *   where: {
     *     // ... the filter for the Documentos we want to count
     *   }
     * })
    **/
    count<T extends DocumentoCountArgs>(
      args?: Subset<T, DocumentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Documento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentoAggregateArgs>(args: Subset<T, DocumentoAggregateArgs>): Prisma.PrismaPromise<GetDocumentoAggregateType<T>>

    /**
     * Group by Documento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentoGroupByArgs['orderBy'] }
        : { orderBy?: DocumentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Documento model
   */
  readonly fields: DocumentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Documento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lancamento<T extends LancamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LancamentoDefaultArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tipoDocumento<T extends TipoDocumentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TipoDocumentoDefaultArgs<ExtArgs>>): Prisma__TipoDocumentoClient<$Result.GetResult<Prisma.$TipoDocumentoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Documento model
   */ 
  interface DocumentoFieldRefs {
    readonly id: FieldRef<"Documento", 'String'>
    readonly lancamentoId: FieldRef<"Documento", 'String'>
    readonly tipoDocumentoId: FieldRef<"Documento", 'String'>
    readonly caminhoOriginal: FieldRef<"Documento", 'String'>
    readonly nomeOriginal: FieldRef<"Documento", 'String'>
    readonly colunaOrigem: FieldRef<"Documento", 'String'>
    readonly planilhaOrigem: FieldRef<"Documento", 'String'>
    readonly tamanhoBytes: FieldRef<"Documento", 'Int'>
    readonly dataDocumento: FieldRef<"Documento", 'DateTime'>
    readonly dataInclusao: FieldRef<"Documento", 'DateTime'>
    readonly observacao: FieldRef<"Documento", 'String'>
    readonly usuarioResponsavel: FieldRef<"Documento", 'String'>
    readonly urlPublica: FieldRef<"Documento", 'String'>
    readonly deletarApos: FieldRef<"Documento", 'DateTime'>
    readonly status: FieldRef<"Documento", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Documento findUnique
   */
  export type DocumentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * Filter, which Documento to fetch.
     */
    where: DocumentoWhereUniqueInput
  }

  /**
   * Documento findUniqueOrThrow
   */
  export type DocumentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * Filter, which Documento to fetch.
     */
    where: DocumentoWhereUniqueInput
  }

  /**
   * Documento findFirst
   */
  export type DocumentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * Filter, which Documento to fetch.
     */
    where?: DocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documentos to fetch.
     */
    orderBy?: DocumentoOrderByWithRelationInput | DocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documentos.
     */
    cursor?: DocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documentos.
     */
    distinct?: DocumentoScalarFieldEnum | DocumentoScalarFieldEnum[]
  }

  /**
   * Documento findFirstOrThrow
   */
  export type DocumentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * Filter, which Documento to fetch.
     */
    where?: DocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documentos to fetch.
     */
    orderBy?: DocumentoOrderByWithRelationInput | DocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documentos.
     */
    cursor?: DocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documentos.
     */
    distinct?: DocumentoScalarFieldEnum | DocumentoScalarFieldEnum[]
  }

  /**
   * Documento findMany
   */
  export type DocumentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * Filter, which Documentos to fetch.
     */
    where?: DocumentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documentos to fetch.
     */
    orderBy?: DocumentoOrderByWithRelationInput | DocumentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documentos.
     */
    cursor?: DocumentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documentos.
     */
    skip?: number
    distinct?: DocumentoScalarFieldEnum | DocumentoScalarFieldEnum[]
  }

  /**
   * Documento create
   */
  export type DocumentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * The data needed to create a Documento.
     */
    data: XOR<DocumentoCreateInput, DocumentoUncheckedCreateInput>
  }

  /**
   * Documento createMany
   */
  export type DocumentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documentos.
     */
    data: DocumentoCreateManyInput | DocumentoCreateManyInput[]
  }

  /**
   * Documento createManyAndReturn
   */
  export type DocumentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Documentos.
     */
    data: DocumentoCreateManyInput | DocumentoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Documento update
   */
  export type DocumentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * The data needed to update a Documento.
     */
    data: XOR<DocumentoUpdateInput, DocumentoUncheckedUpdateInput>
    /**
     * Choose, which Documento to update.
     */
    where: DocumentoWhereUniqueInput
  }

  /**
   * Documento updateMany
   */
  export type DocumentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documentos.
     */
    data: XOR<DocumentoUpdateManyMutationInput, DocumentoUncheckedUpdateManyInput>
    /**
     * Filter which Documentos to update
     */
    where?: DocumentoWhereInput
  }

  /**
   * Documento upsert
   */
  export type DocumentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * The filter to search for the Documento to update in case it exists.
     */
    where: DocumentoWhereUniqueInput
    /**
     * In case the Documento found by the `where` argument doesn't exist, create a new Documento with this data.
     */
    create: XOR<DocumentoCreateInput, DocumentoUncheckedCreateInput>
    /**
     * In case the Documento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentoUpdateInput, DocumentoUncheckedUpdateInput>
  }

  /**
   * Documento delete
   */
  export type DocumentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
    /**
     * Filter which Documento to delete.
     */
    where: DocumentoWhereUniqueInput
  }

  /**
   * Documento deleteMany
   */
  export type DocumentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documentos to delete
     */
    where?: DocumentoWhereInput
  }

  /**
   * Documento without action
   */
  export type DocumentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Documento
     */
    select?: DocumentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentoInclude<ExtArgs> | null
  }


  /**
   * Model HistoricoLancamento
   */

  export type AggregateHistoricoLancamento = {
    _count: HistoricoLancamentoCountAggregateOutputType | null
    _min: HistoricoLancamentoMinAggregateOutputType | null
    _max: HistoricoLancamentoMaxAggregateOutputType | null
  }

  export type HistoricoLancamentoMinAggregateOutputType = {
    id: string | null
    lancamentoId: string | null
    acao: string | null
    descricao: string | null
    detalhes: string | null
    usuario: string | null
    createdAt: Date | null
  }

  export type HistoricoLancamentoMaxAggregateOutputType = {
    id: string | null
    lancamentoId: string | null
    acao: string | null
    descricao: string | null
    detalhes: string | null
    usuario: string | null
    createdAt: Date | null
  }

  export type HistoricoLancamentoCountAggregateOutputType = {
    id: number
    lancamentoId: number
    acao: number
    descricao: number
    detalhes: number
    usuario: number
    createdAt: number
    _all: number
  }


  export type HistoricoLancamentoMinAggregateInputType = {
    id?: true
    lancamentoId?: true
    acao?: true
    descricao?: true
    detalhes?: true
    usuario?: true
    createdAt?: true
  }

  export type HistoricoLancamentoMaxAggregateInputType = {
    id?: true
    lancamentoId?: true
    acao?: true
    descricao?: true
    detalhes?: true
    usuario?: true
    createdAt?: true
  }

  export type HistoricoLancamentoCountAggregateInputType = {
    id?: true
    lancamentoId?: true
    acao?: true
    descricao?: true
    detalhes?: true
    usuario?: true
    createdAt?: true
    _all?: true
  }

  export type HistoricoLancamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoricoLancamento to aggregate.
     */
    where?: HistoricoLancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoLancamentos to fetch.
     */
    orderBy?: HistoricoLancamentoOrderByWithRelationInput | HistoricoLancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HistoricoLancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoLancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoLancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HistoricoLancamentos
    **/
    _count?: true | HistoricoLancamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HistoricoLancamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HistoricoLancamentoMaxAggregateInputType
  }

  export type GetHistoricoLancamentoAggregateType<T extends HistoricoLancamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateHistoricoLancamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHistoricoLancamento[P]>
      : GetScalarType<T[P], AggregateHistoricoLancamento[P]>
  }




  export type HistoricoLancamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HistoricoLancamentoWhereInput
    orderBy?: HistoricoLancamentoOrderByWithAggregationInput | HistoricoLancamentoOrderByWithAggregationInput[]
    by: HistoricoLancamentoScalarFieldEnum[] | HistoricoLancamentoScalarFieldEnum
    having?: HistoricoLancamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HistoricoLancamentoCountAggregateInputType | true
    _min?: HistoricoLancamentoMinAggregateInputType
    _max?: HistoricoLancamentoMaxAggregateInputType
  }

  export type HistoricoLancamentoGroupByOutputType = {
    id: string
    lancamentoId: string
    acao: string
    descricao: string
    detalhes: string | null
    usuario: string | null
    createdAt: Date
    _count: HistoricoLancamentoCountAggregateOutputType | null
    _min: HistoricoLancamentoMinAggregateOutputType | null
    _max: HistoricoLancamentoMaxAggregateOutputType | null
  }

  type GetHistoricoLancamentoGroupByPayload<T extends HistoricoLancamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HistoricoLancamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HistoricoLancamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HistoricoLancamentoGroupByOutputType[P]>
            : GetScalarType<T[P], HistoricoLancamentoGroupByOutputType[P]>
        }
      >
    >


  export type HistoricoLancamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lancamentoId?: boolean
    acao?: boolean
    descricao?: boolean
    detalhes?: boolean
    usuario?: boolean
    createdAt?: boolean
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historicoLancamento"]>

  export type HistoricoLancamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lancamentoId?: boolean
    acao?: boolean
    descricao?: boolean
    detalhes?: boolean
    usuario?: boolean
    createdAt?: boolean
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["historicoLancamento"]>

  export type HistoricoLancamentoSelectScalar = {
    id?: boolean
    lancamentoId?: boolean
    acao?: boolean
    descricao?: boolean
    detalhes?: boolean
    usuario?: boolean
    createdAt?: boolean
  }

  export type HistoricoLancamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }
  export type HistoricoLancamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }

  export type $HistoricoLancamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HistoricoLancamento"
    objects: {
      lancamento: Prisma.$LancamentoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lancamentoId: string
      acao: string
      descricao: string
      detalhes: string | null
      usuario: string | null
      createdAt: Date
    }, ExtArgs["result"]["historicoLancamento"]>
    composites: {}
  }

  type HistoricoLancamentoGetPayload<S extends boolean | null | undefined | HistoricoLancamentoDefaultArgs> = $Result.GetResult<Prisma.$HistoricoLancamentoPayload, S>

  type HistoricoLancamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HistoricoLancamentoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HistoricoLancamentoCountAggregateInputType | true
    }

  export interface HistoricoLancamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HistoricoLancamento'], meta: { name: 'HistoricoLancamento' } }
    /**
     * Find zero or one HistoricoLancamento that matches the filter.
     * @param {HistoricoLancamentoFindUniqueArgs} args - Arguments to find a HistoricoLancamento
     * @example
     * // Get one HistoricoLancamento
     * const historicoLancamento = await prisma.historicoLancamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HistoricoLancamentoFindUniqueArgs>(args: SelectSubset<T, HistoricoLancamentoFindUniqueArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HistoricoLancamento that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HistoricoLancamentoFindUniqueOrThrowArgs} args - Arguments to find a HistoricoLancamento
     * @example
     * // Get one HistoricoLancamento
     * const historicoLancamento = await prisma.historicoLancamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HistoricoLancamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, HistoricoLancamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HistoricoLancamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoLancamentoFindFirstArgs} args - Arguments to find a HistoricoLancamento
     * @example
     * // Get one HistoricoLancamento
     * const historicoLancamento = await prisma.historicoLancamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HistoricoLancamentoFindFirstArgs>(args?: SelectSubset<T, HistoricoLancamentoFindFirstArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HistoricoLancamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoLancamentoFindFirstOrThrowArgs} args - Arguments to find a HistoricoLancamento
     * @example
     * // Get one HistoricoLancamento
     * const historicoLancamento = await prisma.historicoLancamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HistoricoLancamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, HistoricoLancamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HistoricoLancamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoLancamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HistoricoLancamentos
     * const historicoLancamentos = await prisma.historicoLancamento.findMany()
     * 
     * // Get first 10 HistoricoLancamentos
     * const historicoLancamentos = await prisma.historicoLancamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const historicoLancamentoWithIdOnly = await prisma.historicoLancamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HistoricoLancamentoFindManyArgs>(args?: SelectSubset<T, HistoricoLancamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HistoricoLancamento.
     * @param {HistoricoLancamentoCreateArgs} args - Arguments to create a HistoricoLancamento.
     * @example
     * // Create one HistoricoLancamento
     * const HistoricoLancamento = await prisma.historicoLancamento.create({
     *   data: {
     *     // ... data to create a HistoricoLancamento
     *   }
     * })
     * 
     */
    create<T extends HistoricoLancamentoCreateArgs>(args: SelectSubset<T, HistoricoLancamentoCreateArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HistoricoLancamentos.
     * @param {HistoricoLancamentoCreateManyArgs} args - Arguments to create many HistoricoLancamentos.
     * @example
     * // Create many HistoricoLancamentos
     * const historicoLancamento = await prisma.historicoLancamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HistoricoLancamentoCreateManyArgs>(args?: SelectSubset<T, HistoricoLancamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HistoricoLancamentos and returns the data saved in the database.
     * @param {HistoricoLancamentoCreateManyAndReturnArgs} args - Arguments to create many HistoricoLancamentos.
     * @example
     * // Create many HistoricoLancamentos
     * const historicoLancamento = await prisma.historicoLancamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HistoricoLancamentos and only return the `id`
     * const historicoLancamentoWithIdOnly = await prisma.historicoLancamento.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HistoricoLancamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, HistoricoLancamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HistoricoLancamento.
     * @param {HistoricoLancamentoDeleteArgs} args - Arguments to delete one HistoricoLancamento.
     * @example
     * // Delete one HistoricoLancamento
     * const HistoricoLancamento = await prisma.historicoLancamento.delete({
     *   where: {
     *     // ... filter to delete one HistoricoLancamento
     *   }
     * })
     * 
     */
    delete<T extends HistoricoLancamentoDeleteArgs>(args: SelectSubset<T, HistoricoLancamentoDeleteArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HistoricoLancamento.
     * @param {HistoricoLancamentoUpdateArgs} args - Arguments to update one HistoricoLancamento.
     * @example
     * // Update one HistoricoLancamento
     * const historicoLancamento = await prisma.historicoLancamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HistoricoLancamentoUpdateArgs>(args: SelectSubset<T, HistoricoLancamentoUpdateArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HistoricoLancamentos.
     * @param {HistoricoLancamentoDeleteManyArgs} args - Arguments to filter HistoricoLancamentos to delete.
     * @example
     * // Delete a few HistoricoLancamentos
     * const { count } = await prisma.historicoLancamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HistoricoLancamentoDeleteManyArgs>(args?: SelectSubset<T, HistoricoLancamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HistoricoLancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoLancamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HistoricoLancamentos
     * const historicoLancamento = await prisma.historicoLancamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HistoricoLancamentoUpdateManyArgs>(args: SelectSubset<T, HistoricoLancamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HistoricoLancamento.
     * @param {HistoricoLancamentoUpsertArgs} args - Arguments to update or create a HistoricoLancamento.
     * @example
     * // Update or create a HistoricoLancamento
     * const historicoLancamento = await prisma.historicoLancamento.upsert({
     *   create: {
     *     // ... data to create a HistoricoLancamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HistoricoLancamento we want to update
     *   }
     * })
     */
    upsert<T extends HistoricoLancamentoUpsertArgs>(args: SelectSubset<T, HistoricoLancamentoUpsertArgs<ExtArgs>>): Prisma__HistoricoLancamentoClient<$Result.GetResult<Prisma.$HistoricoLancamentoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HistoricoLancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoLancamentoCountArgs} args - Arguments to filter HistoricoLancamentos to count.
     * @example
     * // Count the number of HistoricoLancamentos
     * const count = await prisma.historicoLancamento.count({
     *   where: {
     *     // ... the filter for the HistoricoLancamentos we want to count
     *   }
     * })
    **/
    count<T extends HistoricoLancamentoCountArgs>(
      args?: Subset<T, HistoricoLancamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HistoricoLancamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HistoricoLancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoLancamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HistoricoLancamentoAggregateArgs>(args: Subset<T, HistoricoLancamentoAggregateArgs>): Prisma.PrismaPromise<GetHistoricoLancamentoAggregateType<T>>

    /**
     * Group by HistoricoLancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HistoricoLancamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HistoricoLancamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HistoricoLancamentoGroupByArgs['orderBy'] }
        : { orderBy?: HistoricoLancamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HistoricoLancamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHistoricoLancamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HistoricoLancamento model
   */
  readonly fields: HistoricoLancamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HistoricoLancamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HistoricoLancamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lancamento<T extends LancamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LancamentoDefaultArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HistoricoLancamento model
   */ 
  interface HistoricoLancamentoFieldRefs {
    readonly id: FieldRef<"HistoricoLancamento", 'String'>
    readonly lancamentoId: FieldRef<"HistoricoLancamento", 'String'>
    readonly acao: FieldRef<"HistoricoLancamento", 'String'>
    readonly descricao: FieldRef<"HistoricoLancamento", 'String'>
    readonly detalhes: FieldRef<"HistoricoLancamento", 'String'>
    readonly usuario: FieldRef<"HistoricoLancamento", 'String'>
    readonly createdAt: FieldRef<"HistoricoLancamento", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HistoricoLancamento findUnique
   */
  export type HistoricoLancamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoLancamento to fetch.
     */
    where: HistoricoLancamentoWhereUniqueInput
  }

  /**
   * HistoricoLancamento findUniqueOrThrow
   */
  export type HistoricoLancamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoLancamento to fetch.
     */
    where: HistoricoLancamentoWhereUniqueInput
  }

  /**
   * HistoricoLancamento findFirst
   */
  export type HistoricoLancamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoLancamento to fetch.
     */
    where?: HistoricoLancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoLancamentos to fetch.
     */
    orderBy?: HistoricoLancamentoOrderByWithRelationInput | HistoricoLancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoricoLancamentos.
     */
    cursor?: HistoricoLancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoLancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoLancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoricoLancamentos.
     */
    distinct?: HistoricoLancamentoScalarFieldEnum | HistoricoLancamentoScalarFieldEnum[]
  }

  /**
   * HistoricoLancamento findFirstOrThrow
   */
  export type HistoricoLancamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoLancamento to fetch.
     */
    where?: HistoricoLancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoLancamentos to fetch.
     */
    orderBy?: HistoricoLancamentoOrderByWithRelationInput | HistoricoLancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HistoricoLancamentos.
     */
    cursor?: HistoricoLancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoLancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoLancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HistoricoLancamentos.
     */
    distinct?: HistoricoLancamentoScalarFieldEnum | HistoricoLancamentoScalarFieldEnum[]
  }

  /**
   * HistoricoLancamento findMany
   */
  export type HistoricoLancamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * Filter, which HistoricoLancamentos to fetch.
     */
    where?: HistoricoLancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HistoricoLancamentos to fetch.
     */
    orderBy?: HistoricoLancamentoOrderByWithRelationInput | HistoricoLancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HistoricoLancamentos.
     */
    cursor?: HistoricoLancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HistoricoLancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HistoricoLancamentos.
     */
    skip?: number
    distinct?: HistoricoLancamentoScalarFieldEnum | HistoricoLancamentoScalarFieldEnum[]
  }

  /**
   * HistoricoLancamento create
   */
  export type HistoricoLancamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a HistoricoLancamento.
     */
    data: XOR<HistoricoLancamentoCreateInput, HistoricoLancamentoUncheckedCreateInput>
  }

  /**
   * HistoricoLancamento createMany
   */
  export type HistoricoLancamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HistoricoLancamentos.
     */
    data: HistoricoLancamentoCreateManyInput | HistoricoLancamentoCreateManyInput[]
  }

  /**
   * HistoricoLancamento createManyAndReturn
   */
  export type HistoricoLancamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HistoricoLancamentos.
     */
    data: HistoricoLancamentoCreateManyInput | HistoricoLancamentoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HistoricoLancamento update
   */
  export type HistoricoLancamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a HistoricoLancamento.
     */
    data: XOR<HistoricoLancamentoUpdateInput, HistoricoLancamentoUncheckedUpdateInput>
    /**
     * Choose, which HistoricoLancamento to update.
     */
    where: HistoricoLancamentoWhereUniqueInput
  }

  /**
   * HistoricoLancamento updateMany
   */
  export type HistoricoLancamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HistoricoLancamentos.
     */
    data: XOR<HistoricoLancamentoUpdateManyMutationInput, HistoricoLancamentoUncheckedUpdateManyInput>
    /**
     * Filter which HistoricoLancamentos to update
     */
    where?: HistoricoLancamentoWhereInput
  }

  /**
   * HistoricoLancamento upsert
   */
  export type HistoricoLancamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the HistoricoLancamento to update in case it exists.
     */
    where: HistoricoLancamentoWhereUniqueInput
    /**
     * In case the HistoricoLancamento found by the `where` argument doesn't exist, create a new HistoricoLancamento with this data.
     */
    create: XOR<HistoricoLancamentoCreateInput, HistoricoLancamentoUncheckedCreateInput>
    /**
     * In case the HistoricoLancamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HistoricoLancamentoUpdateInput, HistoricoLancamentoUncheckedUpdateInput>
  }

  /**
   * HistoricoLancamento delete
   */
  export type HistoricoLancamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
    /**
     * Filter which HistoricoLancamento to delete.
     */
    where: HistoricoLancamentoWhereUniqueInput
  }

  /**
   * HistoricoLancamento deleteMany
   */
  export type HistoricoLancamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HistoricoLancamentos to delete
     */
    where?: HistoricoLancamentoWhereInput
  }

  /**
   * HistoricoLancamento without action
   */
  export type HistoricoLancamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HistoricoLancamento
     */
    select?: HistoricoLancamentoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HistoricoLancamentoInclude<ExtArgs> | null
  }


  /**
   * Model MarcacaoComplementacao
   */

  export type AggregateMarcacaoComplementacao = {
    _count: MarcacaoComplementacaoCountAggregateOutputType | null
    _min: MarcacaoComplementacaoMinAggregateOutputType | null
    _max: MarcacaoComplementacaoMaxAggregateOutputType | null
  }

  export type MarcacaoComplementacaoMinAggregateOutputType = {
    id: string | null
    lancamentoId: string | null
    tipoDocumentoEsperado: string | null
    situacao: string | null
    observacao: string | null
  }

  export type MarcacaoComplementacaoMaxAggregateOutputType = {
    id: string | null
    lancamentoId: string | null
    tipoDocumentoEsperado: string | null
    situacao: string | null
    observacao: string | null
  }

  export type MarcacaoComplementacaoCountAggregateOutputType = {
    id: number
    lancamentoId: number
    tipoDocumentoEsperado: number
    situacao: number
    observacao: number
    _all: number
  }


  export type MarcacaoComplementacaoMinAggregateInputType = {
    id?: true
    lancamentoId?: true
    tipoDocumentoEsperado?: true
    situacao?: true
    observacao?: true
  }

  export type MarcacaoComplementacaoMaxAggregateInputType = {
    id?: true
    lancamentoId?: true
    tipoDocumentoEsperado?: true
    situacao?: true
    observacao?: true
  }

  export type MarcacaoComplementacaoCountAggregateInputType = {
    id?: true
    lancamentoId?: true
    tipoDocumentoEsperado?: true
    situacao?: true
    observacao?: true
    _all?: true
  }

  export type MarcacaoComplementacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarcacaoComplementacao to aggregate.
     */
    where?: MarcacaoComplementacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarcacaoComplementacaos to fetch.
     */
    orderBy?: MarcacaoComplementacaoOrderByWithRelationInput | MarcacaoComplementacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarcacaoComplementacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarcacaoComplementacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarcacaoComplementacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarcacaoComplementacaos
    **/
    _count?: true | MarcacaoComplementacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarcacaoComplementacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarcacaoComplementacaoMaxAggregateInputType
  }

  export type GetMarcacaoComplementacaoAggregateType<T extends MarcacaoComplementacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateMarcacaoComplementacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarcacaoComplementacao[P]>
      : GetScalarType<T[P], AggregateMarcacaoComplementacao[P]>
  }




  export type MarcacaoComplementacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarcacaoComplementacaoWhereInput
    orderBy?: MarcacaoComplementacaoOrderByWithAggregationInput | MarcacaoComplementacaoOrderByWithAggregationInput[]
    by: MarcacaoComplementacaoScalarFieldEnum[] | MarcacaoComplementacaoScalarFieldEnum
    having?: MarcacaoComplementacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarcacaoComplementacaoCountAggregateInputType | true
    _min?: MarcacaoComplementacaoMinAggregateInputType
    _max?: MarcacaoComplementacaoMaxAggregateInputType
  }

  export type MarcacaoComplementacaoGroupByOutputType = {
    id: string
    lancamentoId: string
    tipoDocumentoEsperado: string
    situacao: string
    observacao: string | null
    _count: MarcacaoComplementacaoCountAggregateOutputType | null
    _min: MarcacaoComplementacaoMinAggregateOutputType | null
    _max: MarcacaoComplementacaoMaxAggregateOutputType | null
  }

  type GetMarcacaoComplementacaoGroupByPayload<T extends MarcacaoComplementacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarcacaoComplementacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarcacaoComplementacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarcacaoComplementacaoGroupByOutputType[P]>
            : GetScalarType<T[P], MarcacaoComplementacaoGroupByOutputType[P]>
        }
      >
    >


  export type MarcacaoComplementacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lancamentoId?: boolean
    tipoDocumentoEsperado?: boolean
    situacao?: boolean
    observacao?: boolean
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marcacaoComplementacao"]>

  export type MarcacaoComplementacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lancamentoId?: boolean
    tipoDocumentoEsperado?: boolean
    situacao?: boolean
    observacao?: boolean
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marcacaoComplementacao"]>

  export type MarcacaoComplementacaoSelectScalar = {
    id?: boolean
    lancamentoId?: boolean
    tipoDocumentoEsperado?: boolean
    situacao?: boolean
    observacao?: boolean
  }

  export type MarcacaoComplementacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }
  export type MarcacaoComplementacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamento?: boolean | LancamentoDefaultArgs<ExtArgs>
  }

  export type $MarcacaoComplementacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MarcacaoComplementacao"
    objects: {
      lancamento: Prisma.$LancamentoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lancamentoId: string
      tipoDocumentoEsperado: string
      situacao: string
      observacao: string | null
    }, ExtArgs["result"]["marcacaoComplementacao"]>
    composites: {}
  }

  type MarcacaoComplementacaoGetPayload<S extends boolean | null | undefined | MarcacaoComplementacaoDefaultArgs> = $Result.GetResult<Prisma.$MarcacaoComplementacaoPayload, S>

  type MarcacaoComplementacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MarcacaoComplementacaoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MarcacaoComplementacaoCountAggregateInputType | true
    }

  export interface MarcacaoComplementacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MarcacaoComplementacao'], meta: { name: 'MarcacaoComplementacao' } }
    /**
     * Find zero or one MarcacaoComplementacao that matches the filter.
     * @param {MarcacaoComplementacaoFindUniqueArgs} args - Arguments to find a MarcacaoComplementacao
     * @example
     * // Get one MarcacaoComplementacao
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarcacaoComplementacaoFindUniqueArgs>(args: SelectSubset<T, MarcacaoComplementacaoFindUniqueArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MarcacaoComplementacao that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MarcacaoComplementacaoFindUniqueOrThrowArgs} args - Arguments to find a MarcacaoComplementacao
     * @example
     * // Get one MarcacaoComplementacao
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarcacaoComplementacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, MarcacaoComplementacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MarcacaoComplementacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcacaoComplementacaoFindFirstArgs} args - Arguments to find a MarcacaoComplementacao
     * @example
     * // Get one MarcacaoComplementacao
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarcacaoComplementacaoFindFirstArgs>(args?: SelectSubset<T, MarcacaoComplementacaoFindFirstArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MarcacaoComplementacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcacaoComplementacaoFindFirstOrThrowArgs} args - Arguments to find a MarcacaoComplementacao
     * @example
     * // Get one MarcacaoComplementacao
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarcacaoComplementacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, MarcacaoComplementacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MarcacaoComplementacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcacaoComplementacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarcacaoComplementacaos
     * const marcacaoComplementacaos = await prisma.marcacaoComplementacao.findMany()
     * 
     * // Get first 10 MarcacaoComplementacaos
     * const marcacaoComplementacaos = await prisma.marcacaoComplementacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marcacaoComplementacaoWithIdOnly = await prisma.marcacaoComplementacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarcacaoComplementacaoFindManyArgs>(args?: SelectSubset<T, MarcacaoComplementacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MarcacaoComplementacao.
     * @param {MarcacaoComplementacaoCreateArgs} args - Arguments to create a MarcacaoComplementacao.
     * @example
     * // Create one MarcacaoComplementacao
     * const MarcacaoComplementacao = await prisma.marcacaoComplementacao.create({
     *   data: {
     *     // ... data to create a MarcacaoComplementacao
     *   }
     * })
     * 
     */
    create<T extends MarcacaoComplementacaoCreateArgs>(args: SelectSubset<T, MarcacaoComplementacaoCreateArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MarcacaoComplementacaos.
     * @param {MarcacaoComplementacaoCreateManyArgs} args - Arguments to create many MarcacaoComplementacaos.
     * @example
     * // Create many MarcacaoComplementacaos
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarcacaoComplementacaoCreateManyArgs>(args?: SelectSubset<T, MarcacaoComplementacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MarcacaoComplementacaos and returns the data saved in the database.
     * @param {MarcacaoComplementacaoCreateManyAndReturnArgs} args - Arguments to create many MarcacaoComplementacaos.
     * @example
     * // Create many MarcacaoComplementacaos
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MarcacaoComplementacaos and only return the `id`
     * const marcacaoComplementacaoWithIdOnly = await prisma.marcacaoComplementacao.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarcacaoComplementacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, MarcacaoComplementacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MarcacaoComplementacao.
     * @param {MarcacaoComplementacaoDeleteArgs} args - Arguments to delete one MarcacaoComplementacao.
     * @example
     * // Delete one MarcacaoComplementacao
     * const MarcacaoComplementacao = await prisma.marcacaoComplementacao.delete({
     *   where: {
     *     // ... filter to delete one MarcacaoComplementacao
     *   }
     * })
     * 
     */
    delete<T extends MarcacaoComplementacaoDeleteArgs>(args: SelectSubset<T, MarcacaoComplementacaoDeleteArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MarcacaoComplementacao.
     * @param {MarcacaoComplementacaoUpdateArgs} args - Arguments to update one MarcacaoComplementacao.
     * @example
     * // Update one MarcacaoComplementacao
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarcacaoComplementacaoUpdateArgs>(args: SelectSubset<T, MarcacaoComplementacaoUpdateArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MarcacaoComplementacaos.
     * @param {MarcacaoComplementacaoDeleteManyArgs} args - Arguments to filter MarcacaoComplementacaos to delete.
     * @example
     * // Delete a few MarcacaoComplementacaos
     * const { count } = await prisma.marcacaoComplementacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarcacaoComplementacaoDeleteManyArgs>(args?: SelectSubset<T, MarcacaoComplementacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarcacaoComplementacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcacaoComplementacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarcacaoComplementacaos
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarcacaoComplementacaoUpdateManyArgs>(args: SelectSubset<T, MarcacaoComplementacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MarcacaoComplementacao.
     * @param {MarcacaoComplementacaoUpsertArgs} args - Arguments to update or create a MarcacaoComplementacao.
     * @example
     * // Update or create a MarcacaoComplementacao
     * const marcacaoComplementacao = await prisma.marcacaoComplementacao.upsert({
     *   create: {
     *     // ... data to create a MarcacaoComplementacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarcacaoComplementacao we want to update
     *   }
     * })
     */
    upsert<T extends MarcacaoComplementacaoUpsertArgs>(args: SelectSubset<T, MarcacaoComplementacaoUpsertArgs<ExtArgs>>): Prisma__MarcacaoComplementacaoClient<$Result.GetResult<Prisma.$MarcacaoComplementacaoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MarcacaoComplementacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcacaoComplementacaoCountArgs} args - Arguments to filter MarcacaoComplementacaos to count.
     * @example
     * // Count the number of MarcacaoComplementacaos
     * const count = await prisma.marcacaoComplementacao.count({
     *   where: {
     *     // ... the filter for the MarcacaoComplementacaos we want to count
     *   }
     * })
    **/
    count<T extends MarcacaoComplementacaoCountArgs>(
      args?: Subset<T, MarcacaoComplementacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarcacaoComplementacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarcacaoComplementacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcacaoComplementacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarcacaoComplementacaoAggregateArgs>(args: Subset<T, MarcacaoComplementacaoAggregateArgs>): Prisma.PrismaPromise<GetMarcacaoComplementacaoAggregateType<T>>

    /**
     * Group by MarcacaoComplementacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcacaoComplementacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarcacaoComplementacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarcacaoComplementacaoGroupByArgs['orderBy'] }
        : { orderBy?: MarcacaoComplementacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarcacaoComplementacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarcacaoComplementacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MarcacaoComplementacao model
   */
  readonly fields: MarcacaoComplementacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarcacaoComplementacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarcacaoComplementacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lancamento<T extends LancamentoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LancamentoDefaultArgs<ExtArgs>>): Prisma__LancamentoClient<$Result.GetResult<Prisma.$LancamentoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MarcacaoComplementacao model
   */ 
  interface MarcacaoComplementacaoFieldRefs {
    readonly id: FieldRef<"MarcacaoComplementacao", 'String'>
    readonly lancamentoId: FieldRef<"MarcacaoComplementacao", 'String'>
    readonly tipoDocumentoEsperado: FieldRef<"MarcacaoComplementacao", 'String'>
    readonly situacao: FieldRef<"MarcacaoComplementacao", 'String'>
    readonly observacao: FieldRef<"MarcacaoComplementacao", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MarcacaoComplementacao findUnique
   */
  export type MarcacaoComplementacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * Filter, which MarcacaoComplementacao to fetch.
     */
    where: MarcacaoComplementacaoWhereUniqueInput
  }

  /**
   * MarcacaoComplementacao findUniqueOrThrow
   */
  export type MarcacaoComplementacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * Filter, which MarcacaoComplementacao to fetch.
     */
    where: MarcacaoComplementacaoWhereUniqueInput
  }

  /**
   * MarcacaoComplementacao findFirst
   */
  export type MarcacaoComplementacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * Filter, which MarcacaoComplementacao to fetch.
     */
    where?: MarcacaoComplementacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarcacaoComplementacaos to fetch.
     */
    orderBy?: MarcacaoComplementacaoOrderByWithRelationInput | MarcacaoComplementacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarcacaoComplementacaos.
     */
    cursor?: MarcacaoComplementacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarcacaoComplementacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarcacaoComplementacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarcacaoComplementacaos.
     */
    distinct?: MarcacaoComplementacaoScalarFieldEnum | MarcacaoComplementacaoScalarFieldEnum[]
  }

  /**
   * MarcacaoComplementacao findFirstOrThrow
   */
  export type MarcacaoComplementacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * Filter, which MarcacaoComplementacao to fetch.
     */
    where?: MarcacaoComplementacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarcacaoComplementacaos to fetch.
     */
    orderBy?: MarcacaoComplementacaoOrderByWithRelationInput | MarcacaoComplementacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarcacaoComplementacaos.
     */
    cursor?: MarcacaoComplementacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarcacaoComplementacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarcacaoComplementacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarcacaoComplementacaos.
     */
    distinct?: MarcacaoComplementacaoScalarFieldEnum | MarcacaoComplementacaoScalarFieldEnum[]
  }

  /**
   * MarcacaoComplementacao findMany
   */
  export type MarcacaoComplementacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * Filter, which MarcacaoComplementacaos to fetch.
     */
    where?: MarcacaoComplementacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarcacaoComplementacaos to fetch.
     */
    orderBy?: MarcacaoComplementacaoOrderByWithRelationInput | MarcacaoComplementacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarcacaoComplementacaos.
     */
    cursor?: MarcacaoComplementacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarcacaoComplementacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarcacaoComplementacaos.
     */
    skip?: number
    distinct?: MarcacaoComplementacaoScalarFieldEnum | MarcacaoComplementacaoScalarFieldEnum[]
  }

  /**
   * MarcacaoComplementacao create
   */
  export type MarcacaoComplementacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a MarcacaoComplementacao.
     */
    data: XOR<MarcacaoComplementacaoCreateInput, MarcacaoComplementacaoUncheckedCreateInput>
  }

  /**
   * MarcacaoComplementacao createMany
   */
  export type MarcacaoComplementacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarcacaoComplementacaos.
     */
    data: MarcacaoComplementacaoCreateManyInput | MarcacaoComplementacaoCreateManyInput[]
  }

  /**
   * MarcacaoComplementacao createManyAndReturn
   */
  export type MarcacaoComplementacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MarcacaoComplementacaos.
     */
    data: MarcacaoComplementacaoCreateManyInput | MarcacaoComplementacaoCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MarcacaoComplementacao update
   */
  export type MarcacaoComplementacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a MarcacaoComplementacao.
     */
    data: XOR<MarcacaoComplementacaoUpdateInput, MarcacaoComplementacaoUncheckedUpdateInput>
    /**
     * Choose, which MarcacaoComplementacao to update.
     */
    where: MarcacaoComplementacaoWhereUniqueInput
  }

  /**
   * MarcacaoComplementacao updateMany
   */
  export type MarcacaoComplementacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MarcacaoComplementacaos.
     */
    data: XOR<MarcacaoComplementacaoUpdateManyMutationInput, MarcacaoComplementacaoUncheckedUpdateManyInput>
    /**
     * Filter which MarcacaoComplementacaos to update
     */
    where?: MarcacaoComplementacaoWhereInput
  }

  /**
   * MarcacaoComplementacao upsert
   */
  export type MarcacaoComplementacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the MarcacaoComplementacao to update in case it exists.
     */
    where: MarcacaoComplementacaoWhereUniqueInput
    /**
     * In case the MarcacaoComplementacao found by the `where` argument doesn't exist, create a new MarcacaoComplementacao with this data.
     */
    create: XOR<MarcacaoComplementacaoCreateInput, MarcacaoComplementacaoUncheckedCreateInput>
    /**
     * In case the MarcacaoComplementacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarcacaoComplementacaoUpdateInput, MarcacaoComplementacaoUncheckedUpdateInput>
  }

  /**
   * MarcacaoComplementacao delete
   */
  export type MarcacaoComplementacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
    /**
     * Filter which MarcacaoComplementacao to delete.
     */
    where: MarcacaoComplementacaoWhereUniqueInput
  }

  /**
   * MarcacaoComplementacao deleteMany
   */
  export type MarcacaoComplementacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarcacaoComplementacaos to delete
     */
    where?: MarcacaoComplementacaoWhereInput
  }

  /**
   * MarcacaoComplementacao without action
   */
  export type MarcacaoComplementacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcacaoComplementacao
     */
    select?: MarcacaoComplementacaoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcacaoComplementacaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    legacyId: 'legacyId',
    nomeFantasia: 'nomeFantasia',
    razaoSocial: 'razaoSocial',
    cnpj: 'cnpj',
    cidade: 'cidade',
    tipificacao: 'tipificacao',
    dadosCadastrais: 'dadosCadastrais',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const AgenciaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cnpj: 'cnpj',
    contatos: 'contatos',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgenciaScalarFieldEnum = (typeof AgenciaScalarFieldEnum)[keyof typeof AgenciaScalarFieldEnum]


  export const VeiculoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    identificacao: 'identificacao',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VeiculoScalarFieldEnum = (typeof VeiculoScalarFieldEnum)[keyof typeof VeiculoScalarFieldEnum]


  export const ColaboradorScalarFieldEnum: {
    id: 'id',
    legacyId: 'legacyId',
    nome: 'nome',
    cpfCnpj: 'cpfCnpj',
    cargo: 'cargo',
    tipificacao: 'tipificacao',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ColaboradorScalarFieldEnum = (typeof ColaboradorScalarFieldEnum)[keyof typeof ColaboradorScalarFieldEnum]


  export const LancamentoScalarFieldEnum: {
    id: 'id',
    appSheetId: 'appSheetId',
    tipoLancamento: 'tipoLancamento',
    clienteId: 'clienteId',
    agenciaId: 'agenciaId',
    veiculoId: 'veiculoId',
    colaboradorId: 'colaboradorId',
    numeroNotaFiscal: 'numeroNotaFiscal',
    dataEmissao: 'dataEmissao',
    valor: 'valor',
    vencimento: 'vencimento',
    descricao: 'descricao',
    numeroPi: 'numeroPi',
    numeroContrato: 'numeroContrato',
    mesAnoReferencia: 'mesAnoReferencia',
    statusPagto: 'statusPagto',
    statusCobranca: 'statusCobranca',
    statusNfe: 'statusNfe',
    dataEnvio: 'dataEnvio',
    valorPagto: 'valorPagto',
    dataPagamento: 'dataPagamento',
    dataEnvioNfe: 'dataEnvioNfe',
    canalCobranca: 'canalCobranca',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LancamentoScalarFieldEnum = (typeof LancamentoScalarFieldEnum)[keyof typeof LancamentoScalarFieldEnum]


  export const TipoDocumentoScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    icone: 'icone'
  };

  export type TipoDocumentoScalarFieldEnum = (typeof TipoDocumentoScalarFieldEnum)[keyof typeof TipoDocumentoScalarFieldEnum]


  export const DocumentoScalarFieldEnum: {
    id: 'id',
    lancamentoId: 'lancamentoId',
    tipoDocumentoId: 'tipoDocumentoId',
    caminhoOriginal: 'caminhoOriginal',
    nomeOriginal: 'nomeOriginal',
    colunaOrigem: 'colunaOrigem',
    planilhaOrigem: 'planilhaOrigem',
    tamanhoBytes: 'tamanhoBytes',
    dataDocumento: 'dataDocumento',
    dataInclusao: 'dataInclusao',
    observacao: 'observacao',
    usuarioResponsavel: 'usuarioResponsavel',
    urlPublica: 'urlPublica',
    deletarApos: 'deletarApos',
    status: 'status'
  };

  export type DocumentoScalarFieldEnum = (typeof DocumentoScalarFieldEnum)[keyof typeof DocumentoScalarFieldEnum]


  export const HistoricoLancamentoScalarFieldEnum: {
    id: 'id',
    lancamentoId: 'lancamentoId',
    acao: 'acao',
    descricao: 'descricao',
    detalhes: 'detalhes',
    usuario: 'usuario',
    createdAt: 'createdAt'
  };

  export type HistoricoLancamentoScalarFieldEnum = (typeof HistoricoLancamentoScalarFieldEnum)[keyof typeof HistoricoLancamentoScalarFieldEnum]


  export const MarcacaoComplementacaoScalarFieldEnum: {
    id: 'id',
    lancamentoId: 'lancamentoId',
    tipoDocumentoEsperado: 'tipoDocumentoEsperado',
    situacao: 'situacao',
    observacao: 'observacao'
  };

  export type MarcacaoComplementacaoScalarFieldEnum = (typeof MarcacaoComplementacaoScalarFieldEnum)[keyof typeof MarcacaoComplementacaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: StringFilter<"Cliente"> | string
    legacyId?: StringNullableFilter<"Cliente"> | string | null
    nomeFantasia?: StringNullableFilter<"Cliente"> | string | null
    razaoSocial?: StringFilter<"Cliente"> | string
    cnpj?: StringNullableFilter<"Cliente"> | string | null
    cidade?: StringNullableFilter<"Cliente"> | string | null
    tipificacao?: StringNullableFilter<"Cliente"> | string | null
    dadosCadastrais?: StringNullableFilter<"Cliente"> | string | null
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    nomeFantasia?: SortOrderInput | SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    cidade?: SortOrderInput | SortOrder
    tipificacao?: SortOrderInput | SortOrder
    dadosCadastrais?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lancamentos?: LancamentoOrderByRelationAggregateInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    legacyId?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nomeFantasia?: StringNullableFilter<"Cliente"> | string | null
    razaoSocial?: StringFilter<"Cliente"> | string
    cnpj?: StringNullableFilter<"Cliente"> | string | null
    cidade?: StringNullableFilter<"Cliente"> | string | null
    tipificacao?: StringNullableFilter<"Cliente"> | string | null
    dadosCadastrais?: StringNullableFilter<"Cliente"> | string | null
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }, "id" | "legacyId">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    nomeFantasia?: SortOrderInput | SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    cidade?: SortOrderInput | SortOrder
    tipificacao?: SortOrderInput | SortOrder
    dadosCadastrais?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cliente"> | string
    legacyId?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    nomeFantasia?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    razaoSocial?: StringWithAggregatesFilter<"Cliente"> | string
    cnpj?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    cidade?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    tipificacao?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    dadosCadastrais?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
  }

  export type AgenciaWhereInput = {
    AND?: AgenciaWhereInput | AgenciaWhereInput[]
    OR?: AgenciaWhereInput[]
    NOT?: AgenciaWhereInput | AgenciaWhereInput[]
    id?: StringFilter<"Agencia"> | string
    nome?: StringFilter<"Agencia"> | string
    cnpj?: StringNullableFilter<"Agencia"> | string | null
    contatos?: StringNullableFilter<"Agencia"> | string | null
    createdAt?: DateTimeFilter<"Agencia"> | Date | string
    updatedAt?: DateTimeFilter<"Agencia"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }

  export type AgenciaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    contatos?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lancamentos?: LancamentoOrderByRelationAggregateInput
  }

  export type AgenciaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgenciaWhereInput | AgenciaWhereInput[]
    OR?: AgenciaWhereInput[]
    NOT?: AgenciaWhereInput | AgenciaWhereInput[]
    nome?: StringFilter<"Agencia"> | string
    cnpj?: StringNullableFilter<"Agencia"> | string | null
    contatos?: StringNullableFilter<"Agencia"> | string | null
    createdAt?: DateTimeFilter<"Agencia"> | Date | string
    updatedAt?: DateTimeFilter<"Agencia"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }, "id">

  export type AgenciaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrderInput | SortOrder
    contatos?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgenciaCountOrderByAggregateInput
    _max?: AgenciaMaxOrderByAggregateInput
    _min?: AgenciaMinOrderByAggregateInput
  }

  export type AgenciaScalarWhereWithAggregatesInput = {
    AND?: AgenciaScalarWhereWithAggregatesInput | AgenciaScalarWhereWithAggregatesInput[]
    OR?: AgenciaScalarWhereWithAggregatesInput[]
    NOT?: AgenciaScalarWhereWithAggregatesInput | AgenciaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agencia"> | string
    nome?: StringWithAggregatesFilter<"Agencia"> | string
    cnpj?: StringNullableWithAggregatesFilter<"Agencia"> | string | null
    contatos?: StringNullableWithAggregatesFilter<"Agencia"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Agencia"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agencia"> | Date | string
  }

  export type VeiculoWhereInput = {
    AND?: VeiculoWhereInput | VeiculoWhereInput[]
    OR?: VeiculoWhereInput[]
    NOT?: VeiculoWhereInput | VeiculoWhereInput[]
    id?: StringFilter<"Veiculo"> | string
    nome?: StringFilter<"Veiculo"> | string
    identificacao?: StringNullableFilter<"Veiculo"> | string | null
    createdAt?: DateTimeFilter<"Veiculo"> | Date | string
    updatedAt?: DateTimeFilter<"Veiculo"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }

  export type VeiculoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    identificacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lancamentos?: LancamentoOrderByRelationAggregateInput
  }

  export type VeiculoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: VeiculoWhereInput | VeiculoWhereInput[]
    OR?: VeiculoWhereInput[]
    NOT?: VeiculoWhereInput | VeiculoWhereInput[]
    identificacao?: StringNullableFilter<"Veiculo"> | string | null
    createdAt?: DateTimeFilter<"Veiculo"> | Date | string
    updatedAt?: DateTimeFilter<"Veiculo"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }, "id" | "nome">

  export type VeiculoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    identificacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VeiculoCountOrderByAggregateInput
    _max?: VeiculoMaxOrderByAggregateInput
    _min?: VeiculoMinOrderByAggregateInput
  }

  export type VeiculoScalarWhereWithAggregatesInput = {
    AND?: VeiculoScalarWhereWithAggregatesInput | VeiculoScalarWhereWithAggregatesInput[]
    OR?: VeiculoScalarWhereWithAggregatesInput[]
    NOT?: VeiculoScalarWhereWithAggregatesInput | VeiculoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Veiculo"> | string
    nome?: StringWithAggregatesFilter<"Veiculo"> | string
    identificacao?: StringNullableWithAggregatesFilter<"Veiculo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Veiculo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Veiculo"> | Date | string
  }

  export type ColaboradorWhereInput = {
    AND?: ColaboradorWhereInput | ColaboradorWhereInput[]
    OR?: ColaboradorWhereInput[]
    NOT?: ColaboradorWhereInput | ColaboradorWhereInput[]
    id?: StringFilter<"Colaborador"> | string
    legacyId?: StringNullableFilter<"Colaborador"> | string | null
    nome?: StringFilter<"Colaborador"> | string
    cpfCnpj?: StringNullableFilter<"Colaborador"> | string | null
    cargo?: StringNullableFilter<"Colaborador"> | string | null
    tipificacao?: StringNullableFilter<"Colaborador"> | string | null
    createdAt?: DateTimeFilter<"Colaborador"> | Date | string
    updatedAt?: DateTimeFilter<"Colaborador"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }

  export type ColaboradorOrderByWithRelationInput = {
    id?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    nome?: SortOrder
    cpfCnpj?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
    tipificacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lancamentos?: LancamentoOrderByRelationAggregateInput
  }

  export type ColaboradorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    legacyId?: string
    AND?: ColaboradorWhereInput | ColaboradorWhereInput[]
    OR?: ColaboradorWhereInput[]
    NOT?: ColaboradorWhereInput | ColaboradorWhereInput[]
    nome?: StringFilter<"Colaborador"> | string
    cpfCnpj?: StringNullableFilter<"Colaborador"> | string | null
    cargo?: StringNullableFilter<"Colaborador"> | string | null
    tipificacao?: StringNullableFilter<"Colaborador"> | string | null
    createdAt?: DateTimeFilter<"Colaborador"> | Date | string
    updatedAt?: DateTimeFilter<"Colaborador"> | Date | string
    lancamentos?: LancamentoListRelationFilter
  }, "id" | "legacyId">

  export type ColaboradorOrderByWithAggregationInput = {
    id?: SortOrder
    legacyId?: SortOrderInput | SortOrder
    nome?: SortOrder
    cpfCnpj?: SortOrderInput | SortOrder
    cargo?: SortOrderInput | SortOrder
    tipificacao?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ColaboradorCountOrderByAggregateInput
    _max?: ColaboradorMaxOrderByAggregateInput
    _min?: ColaboradorMinOrderByAggregateInput
  }

  export type ColaboradorScalarWhereWithAggregatesInput = {
    AND?: ColaboradorScalarWhereWithAggregatesInput | ColaboradorScalarWhereWithAggregatesInput[]
    OR?: ColaboradorScalarWhereWithAggregatesInput[]
    NOT?: ColaboradorScalarWhereWithAggregatesInput | ColaboradorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Colaborador"> | string
    legacyId?: StringNullableWithAggregatesFilter<"Colaborador"> | string | null
    nome?: StringWithAggregatesFilter<"Colaborador"> | string
    cpfCnpj?: StringNullableWithAggregatesFilter<"Colaborador"> | string | null
    cargo?: StringNullableWithAggregatesFilter<"Colaborador"> | string | null
    tipificacao?: StringNullableWithAggregatesFilter<"Colaborador"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Colaborador"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Colaborador"> | Date | string
  }

  export type LancamentoWhereInput = {
    AND?: LancamentoWhereInput | LancamentoWhereInput[]
    OR?: LancamentoWhereInput[]
    NOT?: LancamentoWhereInput | LancamentoWhereInput[]
    id?: StringFilter<"Lancamento"> | string
    appSheetId?: StringNullableFilter<"Lancamento"> | string | null
    tipoLancamento?: StringFilter<"Lancamento"> | string
    clienteId?: StringNullableFilter<"Lancamento"> | string | null
    agenciaId?: StringNullableFilter<"Lancamento"> | string | null
    veiculoId?: StringNullableFilter<"Lancamento"> | string | null
    colaboradorId?: StringNullableFilter<"Lancamento"> | string | null
    numeroNotaFiscal?: StringNullableFilter<"Lancamento"> | string | null
    dataEmissao?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    valor?: FloatNullableFilter<"Lancamento"> | number | null
    vencimento?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    descricao?: StringNullableFilter<"Lancamento"> | string | null
    numeroPi?: StringNullableFilter<"Lancamento"> | string | null
    numeroContrato?: StringNullableFilter<"Lancamento"> | string | null
    mesAnoReferencia?: StringNullableFilter<"Lancamento"> | string | null
    statusPagto?: StringNullableFilter<"Lancamento"> | string | null
    statusCobranca?: StringNullableFilter<"Lancamento"> | string | null
    statusNfe?: StringNullableFilter<"Lancamento"> | string | null
    dataEnvio?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    valorPagto?: FloatNullableFilter<"Lancamento"> | number | null
    dataPagamento?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    dataEnvioNfe?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    canalCobranca?: StringNullableFilter<"Lancamento"> | string | null
    createdAt?: DateTimeFilter<"Lancamento"> | Date | string
    updatedAt?: DateTimeFilter<"Lancamento"> | Date | string
    cliente?: XOR<ClienteNullableRelationFilter, ClienteWhereInput> | null
    agencia?: XOR<AgenciaNullableRelationFilter, AgenciaWhereInput> | null
    veiculo?: XOR<VeiculoNullableRelationFilter, VeiculoWhereInput> | null
    colaborador?: XOR<ColaboradorNullableRelationFilter, ColaboradorWhereInput> | null
    documentos?: DocumentoListRelationFilter
    marcacoes?: MarcacaoComplementacaoListRelationFilter
    historico?: HistoricoLancamentoListRelationFilter
  }

  export type LancamentoOrderByWithRelationInput = {
    id?: SortOrder
    appSheetId?: SortOrderInput | SortOrder
    tipoLancamento?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    agenciaId?: SortOrderInput | SortOrder
    veiculoId?: SortOrderInput | SortOrder
    colaboradorId?: SortOrderInput | SortOrder
    numeroNotaFiscal?: SortOrderInput | SortOrder
    dataEmissao?: SortOrderInput | SortOrder
    valor?: SortOrderInput | SortOrder
    vencimento?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    numeroPi?: SortOrderInput | SortOrder
    numeroContrato?: SortOrderInput | SortOrder
    mesAnoReferencia?: SortOrderInput | SortOrder
    statusPagto?: SortOrderInput | SortOrder
    statusCobranca?: SortOrderInput | SortOrder
    statusNfe?: SortOrderInput | SortOrder
    dataEnvio?: SortOrderInput | SortOrder
    valorPagto?: SortOrderInput | SortOrder
    dataPagamento?: SortOrderInput | SortOrder
    dataEnvioNfe?: SortOrderInput | SortOrder
    canalCobranca?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cliente?: ClienteOrderByWithRelationInput
    agencia?: AgenciaOrderByWithRelationInput
    veiculo?: VeiculoOrderByWithRelationInput
    colaborador?: ColaboradorOrderByWithRelationInput
    documentos?: DocumentoOrderByRelationAggregateInput
    marcacoes?: MarcacaoComplementacaoOrderByRelationAggregateInput
    historico?: HistoricoLancamentoOrderByRelationAggregateInput
  }

  export type LancamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    appSheetId?: string
    AND?: LancamentoWhereInput | LancamentoWhereInput[]
    OR?: LancamentoWhereInput[]
    NOT?: LancamentoWhereInput | LancamentoWhereInput[]
    tipoLancamento?: StringFilter<"Lancamento"> | string
    clienteId?: StringNullableFilter<"Lancamento"> | string | null
    agenciaId?: StringNullableFilter<"Lancamento"> | string | null
    veiculoId?: StringNullableFilter<"Lancamento"> | string | null
    colaboradorId?: StringNullableFilter<"Lancamento"> | string | null
    numeroNotaFiscal?: StringNullableFilter<"Lancamento"> | string | null
    dataEmissao?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    valor?: FloatNullableFilter<"Lancamento"> | number | null
    vencimento?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    descricao?: StringNullableFilter<"Lancamento"> | string | null
    numeroPi?: StringNullableFilter<"Lancamento"> | string | null
    numeroContrato?: StringNullableFilter<"Lancamento"> | string | null
    mesAnoReferencia?: StringNullableFilter<"Lancamento"> | string | null
    statusPagto?: StringNullableFilter<"Lancamento"> | string | null
    statusCobranca?: StringNullableFilter<"Lancamento"> | string | null
    statusNfe?: StringNullableFilter<"Lancamento"> | string | null
    dataEnvio?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    valorPagto?: FloatNullableFilter<"Lancamento"> | number | null
    dataPagamento?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    dataEnvioNfe?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    canalCobranca?: StringNullableFilter<"Lancamento"> | string | null
    createdAt?: DateTimeFilter<"Lancamento"> | Date | string
    updatedAt?: DateTimeFilter<"Lancamento"> | Date | string
    cliente?: XOR<ClienteNullableRelationFilter, ClienteWhereInput> | null
    agencia?: XOR<AgenciaNullableRelationFilter, AgenciaWhereInput> | null
    veiculo?: XOR<VeiculoNullableRelationFilter, VeiculoWhereInput> | null
    colaborador?: XOR<ColaboradorNullableRelationFilter, ColaboradorWhereInput> | null
    documentos?: DocumentoListRelationFilter
    marcacoes?: MarcacaoComplementacaoListRelationFilter
    historico?: HistoricoLancamentoListRelationFilter
  }, "id" | "appSheetId">

  export type LancamentoOrderByWithAggregationInput = {
    id?: SortOrder
    appSheetId?: SortOrderInput | SortOrder
    tipoLancamento?: SortOrder
    clienteId?: SortOrderInput | SortOrder
    agenciaId?: SortOrderInput | SortOrder
    veiculoId?: SortOrderInput | SortOrder
    colaboradorId?: SortOrderInput | SortOrder
    numeroNotaFiscal?: SortOrderInput | SortOrder
    dataEmissao?: SortOrderInput | SortOrder
    valor?: SortOrderInput | SortOrder
    vencimento?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    numeroPi?: SortOrderInput | SortOrder
    numeroContrato?: SortOrderInput | SortOrder
    mesAnoReferencia?: SortOrderInput | SortOrder
    statusPagto?: SortOrderInput | SortOrder
    statusCobranca?: SortOrderInput | SortOrder
    statusNfe?: SortOrderInput | SortOrder
    dataEnvio?: SortOrderInput | SortOrder
    valorPagto?: SortOrderInput | SortOrder
    dataPagamento?: SortOrderInput | SortOrder
    dataEnvioNfe?: SortOrderInput | SortOrder
    canalCobranca?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LancamentoCountOrderByAggregateInput
    _avg?: LancamentoAvgOrderByAggregateInput
    _max?: LancamentoMaxOrderByAggregateInput
    _min?: LancamentoMinOrderByAggregateInput
    _sum?: LancamentoSumOrderByAggregateInput
  }

  export type LancamentoScalarWhereWithAggregatesInput = {
    AND?: LancamentoScalarWhereWithAggregatesInput | LancamentoScalarWhereWithAggregatesInput[]
    OR?: LancamentoScalarWhereWithAggregatesInput[]
    NOT?: LancamentoScalarWhereWithAggregatesInput | LancamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lancamento"> | string
    appSheetId?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    tipoLancamento?: StringWithAggregatesFilter<"Lancamento"> | string
    clienteId?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    agenciaId?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    veiculoId?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    colaboradorId?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    numeroNotaFiscal?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    dataEmissao?: DateTimeNullableWithAggregatesFilter<"Lancamento"> | Date | string | null
    valor?: FloatNullableWithAggregatesFilter<"Lancamento"> | number | null
    vencimento?: DateTimeNullableWithAggregatesFilter<"Lancamento"> | Date | string | null
    descricao?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    numeroPi?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    numeroContrato?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    mesAnoReferencia?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    statusPagto?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    statusCobranca?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    statusNfe?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    dataEnvio?: DateTimeNullableWithAggregatesFilter<"Lancamento"> | Date | string | null
    valorPagto?: FloatNullableWithAggregatesFilter<"Lancamento"> | number | null
    dataPagamento?: DateTimeNullableWithAggregatesFilter<"Lancamento"> | Date | string | null
    dataEnvioNfe?: DateTimeNullableWithAggregatesFilter<"Lancamento"> | Date | string | null
    canalCobranca?: StringNullableWithAggregatesFilter<"Lancamento"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lancamento"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lancamento"> | Date | string
  }

  export type TipoDocumentoWhereInput = {
    AND?: TipoDocumentoWhereInput | TipoDocumentoWhereInput[]
    OR?: TipoDocumentoWhereInput[]
    NOT?: TipoDocumentoWhereInput | TipoDocumentoWhereInput[]
    id?: StringFilter<"TipoDocumento"> | string
    nome?: StringFilter<"TipoDocumento"> | string
    icone?: StringNullableFilter<"TipoDocumento"> | string | null
    documentos?: DocumentoListRelationFilter
  }

  export type TipoDocumentoOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    icone?: SortOrderInput | SortOrder
    documentos?: DocumentoOrderByRelationAggregateInput
  }

  export type TipoDocumentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nome?: string
    AND?: TipoDocumentoWhereInput | TipoDocumentoWhereInput[]
    OR?: TipoDocumentoWhereInput[]
    NOT?: TipoDocumentoWhereInput | TipoDocumentoWhereInput[]
    icone?: StringNullableFilter<"TipoDocumento"> | string | null
    documentos?: DocumentoListRelationFilter
  }, "id" | "nome">

  export type TipoDocumentoOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    icone?: SortOrderInput | SortOrder
    _count?: TipoDocumentoCountOrderByAggregateInput
    _max?: TipoDocumentoMaxOrderByAggregateInput
    _min?: TipoDocumentoMinOrderByAggregateInput
  }

  export type TipoDocumentoScalarWhereWithAggregatesInput = {
    AND?: TipoDocumentoScalarWhereWithAggregatesInput | TipoDocumentoScalarWhereWithAggregatesInput[]
    OR?: TipoDocumentoScalarWhereWithAggregatesInput[]
    NOT?: TipoDocumentoScalarWhereWithAggregatesInput | TipoDocumentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TipoDocumento"> | string
    nome?: StringWithAggregatesFilter<"TipoDocumento"> | string
    icone?: StringNullableWithAggregatesFilter<"TipoDocumento"> | string | null
  }

  export type DocumentoWhereInput = {
    AND?: DocumentoWhereInput | DocumentoWhereInput[]
    OR?: DocumentoWhereInput[]
    NOT?: DocumentoWhereInput | DocumentoWhereInput[]
    id?: StringFilter<"Documento"> | string
    lancamentoId?: StringFilter<"Documento"> | string
    tipoDocumentoId?: StringFilter<"Documento"> | string
    caminhoOriginal?: StringNullableFilter<"Documento"> | string | null
    nomeOriginal?: StringFilter<"Documento"> | string
    colunaOrigem?: StringNullableFilter<"Documento"> | string | null
    planilhaOrigem?: StringNullableFilter<"Documento"> | string | null
    tamanhoBytes?: IntFilter<"Documento"> | number
    dataDocumento?: DateTimeNullableFilter<"Documento"> | Date | string | null
    dataInclusao?: DateTimeFilter<"Documento"> | Date | string
    observacao?: StringNullableFilter<"Documento"> | string | null
    usuarioResponsavel?: StringNullableFilter<"Documento"> | string | null
    urlPublica?: StringNullableFilter<"Documento"> | string | null
    deletarApos?: DateTimeNullableFilter<"Documento"> | Date | string | null
    status?: StringFilter<"Documento"> | string
    lancamento?: XOR<LancamentoRelationFilter, LancamentoWhereInput>
    tipoDocumento?: XOR<TipoDocumentoRelationFilter, TipoDocumentoWhereInput>
  }

  export type DocumentoOrderByWithRelationInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoId?: SortOrder
    caminhoOriginal?: SortOrderInput | SortOrder
    nomeOriginal?: SortOrder
    colunaOrigem?: SortOrderInput | SortOrder
    planilhaOrigem?: SortOrderInput | SortOrder
    tamanhoBytes?: SortOrder
    dataDocumento?: SortOrderInput | SortOrder
    dataInclusao?: SortOrder
    observacao?: SortOrderInput | SortOrder
    usuarioResponsavel?: SortOrderInput | SortOrder
    urlPublica?: SortOrderInput | SortOrder
    deletarApos?: SortOrderInput | SortOrder
    status?: SortOrder
    lancamento?: LancamentoOrderByWithRelationInput
    tipoDocumento?: TipoDocumentoOrderByWithRelationInput
  }

  export type DocumentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentoWhereInput | DocumentoWhereInput[]
    OR?: DocumentoWhereInput[]
    NOT?: DocumentoWhereInput | DocumentoWhereInput[]
    lancamentoId?: StringFilter<"Documento"> | string
    tipoDocumentoId?: StringFilter<"Documento"> | string
    caminhoOriginal?: StringNullableFilter<"Documento"> | string | null
    nomeOriginal?: StringFilter<"Documento"> | string
    colunaOrigem?: StringNullableFilter<"Documento"> | string | null
    planilhaOrigem?: StringNullableFilter<"Documento"> | string | null
    tamanhoBytes?: IntFilter<"Documento"> | number
    dataDocumento?: DateTimeNullableFilter<"Documento"> | Date | string | null
    dataInclusao?: DateTimeFilter<"Documento"> | Date | string
    observacao?: StringNullableFilter<"Documento"> | string | null
    usuarioResponsavel?: StringNullableFilter<"Documento"> | string | null
    urlPublica?: StringNullableFilter<"Documento"> | string | null
    deletarApos?: DateTimeNullableFilter<"Documento"> | Date | string | null
    status?: StringFilter<"Documento"> | string
    lancamento?: XOR<LancamentoRelationFilter, LancamentoWhereInput>
    tipoDocumento?: XOR<TipoDocumentoRelationFilter, TipoDocumentoWhereInput>
  }, "id">

  export type DocumentoOrderByWithAggregationInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoId?: SortOrder
    caminhoOriginal?: SortOrderInput | SortOrder
    nomeOriginal?: SortOrder
    colunaOrigem?: SortOrderInput | SortOrder
    planilhaOrigem?: SortOrderInput | SortOrder
    tamanhoBytes?: SortOrder
    dataDocumento?: SortOrderInput | SortOrder
    dataInclusao?: SortOrder
    observacao?: SortOrderInput | SortOrder
    usuarioResponsavel?: SortOrderInput | SortOrder
    urlPublica?: SortOrderInput | SortOrder
    deletarApos?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: DocumentoCountOrderByAggregateInput
    _avg?: DocumentoAvgOrderByAggregateInput
    _max?: DocumentoMaxOrderByAggregateInput
    _min?: DocumentoMinOrderByAggregateInput
    _sum?: DocumentoSumOrderByAggregateInput
  }

  export type DocumentoScalarWhereWithAggregatesInput = {
    AND?: DocumentoScalarWhereWithAggregatesInput | DocumentoScalarWhereWithAggregatesInput[]
    OR?: DocumentoScalarWhereWithAggregatesInput[]
    NOT?: DocumentoScalarWhereWithAggregatesInput | DocumentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Documento"> | string
    lancamentoId?: StringWithAggregatesFilter<"Documento"> | string
    tipoDocumentoId?: StringWithAggregatesFilter<"Documento"> | string
    caminhoOriginal?: StringNullableWithAggregatesFilter<"Documento"> | string | null
    nomeOriginal?: StringWithAggregatesFilter<"Documento"> | string
    colunaOrigem?: StringNullableWithAggregatesFilter<"Documento"> | string | null
    planilhaOrigem?: StringNullableWithAggregatesFilter<"Documento"> | string | null
    tamanhoBytes?: IntWithAggregatesFilter<"Documento"> | number
    dataDocumento?: DateTimeNullableWithAggregatesFilter<"Documento"> | Date | string | null
    dataInclusao?: DateTimeWithAggregatesFilter<"Documento"> | Date | string
    observacao?: StringNullableWithAggregatesFilter<"Documento"> | string | null
    usuarioResponsavel?: StringNullableWithAggregatesFilter<"Documento"> | string | null
    urlPublica?: StringNullableWithAggregatesFilter<"Documento"> | string | null
    deletarApos?: DateTimeNullableWithAggregatesFilter<"Documento"> | Date | string | null
    status?: StringWithAggregatesFilter<"Documento"> | string
  }

  export type HistoricoLancamentoWhereInput = {
    AND?: HistoricoLancamentoWhereInput | HistoricoLancamentoWhereInput[]
    OR?: HistoricoLancamentoWhereInput[]
    NOT?: HistoricoLancamentoWhereInput | HistoricoLancamentoWhereInput[]
    id?: StringFilter<"HistoricoLancamento"> | string
    lancamentoId?: StringFilter<"HistoricoLancamento"> | string
    acao?: StringFilter<"HistoricoLancamento"> | string
    descricao?: StringFilter<"HistoricoLancamento"> | string
    detalhes?: StringNullableFilter<"HistoricoLancamento"> | string | null
    usuario?: StringNullableFilter<"HistoricoLancamento"> | string | null
    createdAt?: DateTimeFilter<"HistoricoLancamento"> | Date | string
    lancamento?: XOR<LancamentoRelationFilter, LancamentoWhereInput>
  }

  export type HistoricoLancamentoOrderByWithRelationInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    acao?: SortOrder
    descricao?: SortOrder
    detalhes?: SortOrderInput | SortOrder
    usuario?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lancamento?: LancamentoOrderByWithRelationInput
  }

  export type HistoricoLancamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HistoricoLancamentoWhereInput | HistoricoLancamentoWhereInput[]
    OR?: HistoricoLancamentoWhereInput[]
    NOT?: HistoricoLancamentoWhereInput | HistoricoLancamentoWhereInput[]
    lancamentoId?: StringFilter<"HistoricoLancamento"> | string
    acao?: StringFilter<"HistoricoLancamento"> | string
    descricao?: StringFilter<"HistoricoLancamento"> | string
    detalhes?: StringNullableFilter<"HistoricoLancamento"> | string | null
    usuario?: StringNullableFilter<"HistoricoLancamento"> | string | null
    createdAt?: DateTimeFilter<"HistoricoLancamento"> | Date | string
    lancamento?: XOR<LancamentoRelationFilter, LancamentoWhereInput>
  }, "id">

  export type HistoricoLancamentoOrderByWithAggregationInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    acao?: SortOrder
    descricao?: SortOrder
    detalhes?: SortOrderInput | SortOrder
    usuario?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: HistoricoLancamentoCountOrderByAggregateInput
    _max?: HistoricoLancamentoMaxOrderByAggregateInput
    _min?: HistoricoLancamentoMinOrderByAggregateInput
  }

  export type HistoricoLancamentoScalarWhereWithAggregatesInput = {
    AND?: HistoricoLancamentoScalarWhereWithAggregatesInput | HistoricoLancamentoScalarWhereWithAggregatesInput[]
    OR?: HistoricoLancamentoScalarWhereWithAggregatesInput[]
    NOT?: HistoricoLancamentoScalarWhereWithAggregatesInput | HistoricoLancamentoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HistoricoLancamento"> | string
    lancamentoId?: StringWithAggregatesFilter<"HistoricoLancamento"> | string
    acao?: StringWithAggregatesFilter<"HistoricoLancamento"> | string
    descricao?: StringWithAggregatesFilter<"HistoricoLancamento"> | string
    detalhes?: StringNullableWithAggregatesFilter<"HistoricoLancamento"> | string | null
    usuario?: StringNullableWithAggregatesFilter<"HistoricoLancamento"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HistoricoLancamento"> | Date | string
  }

  export type MarcacaoComplementacaoWhereInput = {
    AND?: MarcacaoComplementacaoWhereInput | MarcacaoComplementacaoWhereInput[]
    OR?: MarcacaoComplementacaoWhereInput[]
    NOT?: MarcacaoComplementacaoWhereInput | MarcacaoComplementacaoWhereInput[]
    id?: StringFilter<"MarcacaoComplementacao"> | string
    lancamentoId?: StringFilter<"MarcacaoComplementacao"> | string
    tipoDocumentoEsperado?: StringFilter<"MarcacaoComplementacao"> | string
    situacao?: StringFilter<"MarcacaoComplementacao"> | string
    observacao?: StringNullableFilter<"MarcacaoComplementacao"> | string | null
    lancamento?: XOR<LancamentoRelationFilter, LancamentoWhereInput>
  }

  export type MarcacaoComplementacaoOrderByWithRelationInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoEsperado?: SortOrder
    situacao?: SortOrder
    observacao?: SortOrderInput | SortOrder
    lancamento?: LancamentoOrderByWithRelationInput
  }

  export type MarcacaoComplementacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MarcacaoComplementacaoWhereInput | MarcacaoComplementacaoWhereInput[]
    OR?: MarcacaoComplementacaoWhereInput[]
    NOT?: MarcacaoComplementacaoWhereInput | MarcacaoComplementacaoWhereInput[]
    lancamentoId?: StringFilter<"MarcacaoComplementacao"> | string
    tipoDocumentoEsperado?: StringFilter<"MarcacaoComplementacao"> | string
    situacao?: StringFilter<"MarcacaoComplementacao"> | string
    observacao?: StringNullableFilter<"MarcacaoComplementacao"> | string | null
    lancamento?: XOR<LancamentoRelationFilter, LancamentoWhereInput>
  }, "id">

  export type MarcacaoComplementacaoOrderByWithAggregationInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoEsperado?: SortOrder
    situacao?: SortOrder
    observacao?: SortOrderInput | SortOrder
    _count?: MarcacaoComplementacaoCountOrderByAggregateInput
    _max?: MarcacaoComplementacaoMaxOrderByAggregateInput
    _min?: MarcacaoComplementacaoMinOrderByAggregateInput
  }

  export type MarcacaoComplementacaoScalarWhereWithAggregatesInput = {
    AND?: MarcacaoComplementacaoScalarWhereWithAggregatesInput | MarcacaoComplementacaoScalarWhereWithAggregatesInput[]
    OR?: MarcacaoComplementacaoScalarWhereWithAggregatesInput[]
    NOT?: MarcacaoComplementacaoScalarWhereWithAggregatesInput | MarcacaoComplementacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MarcacaoComplementacao"> | string
    lancamentoId?: StringWithAggregatesFilter<"MarcacaoComplementacao"> | string
    tipoDocumentoEsperado?: StringWithAggregatesFilter<"MarcacaoComplementacao"> | string
    situacao?: StringWithAggregatesFilter<"MarcacaoComplementacao"> | string
    observacao?: StringNullableWithAggregatesFilter<"MarcacaoComplementacao"> | string | null
  }

  export type ClienteCreateInput = {
    id?: string
    legacyId?: string | null
    nomeFantasia?: string | null
    razaoSocial: string
    cnpj?: string | null
    cidade?: string | null
    tipificacao?: string | null
    dadosCadastrais?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id?: string
    legacyId?: string | null
    nomeFantasia?: string | null
    razaoSocial: string
    cnpj?: string | null
    cidade?: string | null
    tipificacao?: string | null
    dadosCadastrais?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nomeFantasia?: NullableStringFieldUpdateOperationsInput | string | null
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    dadosCadastrais?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nomeFantasia?: NullableStringFieldUpdateOperationsInput | string | null
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    dadosCadastrais?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id?: string
    legacyId?: string | null
    nomeFantasia?: string | null
    razaoSocial: string
    cnpj?: string | null
    cidade?: string | null
    tipificacao?: string | null
    dadosCadastrais?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nomeFantasia?: NullableStringFieldUpdateOperationsInput | string | null
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    dadosCadastrais?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nomeFantasia?: NullableStringFieldUpdateOperationsInput | string | null
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    dadosCadastrais?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgenciaCreateInput = {
    id?: string
    nome: string
    cnpj?: string | null
    contatos?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoCreateNestedManyWithoutAgenciaInput
  }

  export type AgenciaUncheckedCreateInput = {
    id?: string
    nome: string
    cnpj?: string | null
    contatos?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutAgenciaInput
  }

  export type AgenciaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    contatos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUpdateManyWithoutAgenciaNestedInput
  }

  export type AgenciaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    contatos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutAgenciaNestedInput
  }

  export type AgenciaCreateManyInput = {
    id?: string
    nome: string
    cnpj?: string | null
    contatos?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgenciaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    contatos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgenciaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    contatos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoCreateInput = {
    id?: string
    nome: string
    identificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoCreateNestedManyWithoutVeiculoInput
  }

  export type VeiculoUncheckedCreateInput = {
    id?: string
    nome: string
    identificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutVeiculoInput
  }

  export type VeiculoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    identificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUpdateManyWithoutVeiculoNestedInput
  }

  export type VeiculoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    identificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutVeiculoNestedInput
  }

  export type VeiculoCreateManyInput = {
    id?: string
    nome: string
    identificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VeiculoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    identificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    identificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaboradorCreateInput = {
    id?: string
    legacyId?: string | null
    nome: string
    cpfCnpj?: string | null
    cargo?: string | null
    tipificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoCreateNestedManyWithoutColaboradorInput
  }

  export type ColaboradorUncheckedCreateInput = {
    id?: string
    legacyId?: string | null
    nome: string
    cpfCnpj?: string | null
    cargo?: string | null
    tipificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lancamentos?: LancamentoUncheckedCreateNestedManyWithoutColaboradorInput
  }

  export type ColaboradorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUpdateManyWithoutColaboradorNestedInput
  }

  export type ColaboradorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamentos?: LancamentoUncheckedUpdateManyWithoutColaboradorNestedInput
  }

  export type ColaboradorCreateManyInput = {
    id?: string
    legacyId?: string | null
    nome: string
    cpfCnpj?: string | null
    cargo?: string | null
    tipificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColaboradorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaboradorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutLancamentosInput
    agencia?: AgenciaCreateNestedOneWithoutLancamentosInput
    veiculo?: VeiculoCreateNestedOneWithoutLancamentosInput
    colaborador?: ColaboradorCreateNestedOneWithoutLancamentosInput
    documentos?: DocumentoCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documentos?: DocumentoUncheckedCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutLancamentosNestedInput
    agencia?: AgenciaUpdateOneWithoutLancamentosNestedInput
    veiculo?: VeiculoUpdateOneWithoutLancamentosNestedInput
    colaborador?: ColaboradorUpdateOneWithoutLancamentosNestedInput
    documentos?: DocumentoUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentos?: DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoCreateManyInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LancamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TipoDocumentoCreateInput = {
    id?: string
    nome: string
    icone?: string | null
    documentos?: DocumentoCreateNestedManyWithoutTipoDocumentoInput
  }

  export type TipoDocumentoUncheckedCreateInput = {
    id?: string
    nome: string
    icone?: string | null
    documentos?: DocumentoUncheckedCreateNestedManyWithoutTipoDocumentoInput
  }

  export type TipoDocumentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    documentos?: DocumentoUpdateManyWithoutTipoDocumentoNestedInput
  }

  export type TipoDocumentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    icone?: NullableStringFieldUpdateOperationsInput | string | null
    documentos?: DocumentoUncheckedUpdateManyWithoutTipoDocumentoNestedInput
  }

  export type TipoDocumentoCreateManyInput = {
    id?: string
    nome: string
    icone?: string | null
  }

  export type TipoDocumentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    icone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipoDocumentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    icone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocumentoCreateInput = {
    id?: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
    lancamento: LancamentoCreateNestedOneWithoutDocumentosInput
    tipoDocumento: TipoDocumentoCreateNestedOneWithoutDocumentosInput
  }

  export type DocumentoUncheckedCreateInput = {
    id?: string
    lancamentoId: string
    tipoDocumentoId: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
  }

  export type DocumentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    lancamento?: LancamentoUpdateOneRequiredWithoutDocumentosNestedInput
    tipoDocumento?: TipoDocumentoUpdateOneRequiredWithoutDocumentosNestedInput
  }

  export type DocumentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    tipoDocumentoId?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentoCreateManyInput = {
    id?: string
    lancamentoId: string
    tipoDocumentoId: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
  }

  export type DocumentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    tipoDocumentoId?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type HistoricoLancamentoCreateInput = {
    id?: string
    acao: string
    descricao: string
    detalhes?: string | null
    usuario?: string | null
    createdAt?: Date | string
    lancamento: LancamentoCreateNestedOneWithoutHistoricoInput
  }

  export type HistoricoLancamentoUncheckedCreateInput = {
    id?: string
    lancamentoId: string
    acao: string
    descricao: string
    detalhes?: string | null
    usuario?: string | null
    createdAt?: Date | string
  }

  export type HistoricoLancamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    acao?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lancamento?: LancamentoUpdateOneRequiredWithoutHistoricoNestedInput
  }

  export type HistoricoLancamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    acao?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoLancamentoCreateManyInput = {
    id?: string
    lancamentoId: string
    acao: string
    descricao: string
    detalhes?: string | null
    usuario?: string | null
    createdAt?: Date | string
  }

  export type HistoricoLancamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    acao?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoLancamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    acao?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarcacaoComplementacaoCreateInput = {
    id?: string
    tipoDocumentoEsperado: string
    situacao?: string
    observacao?: string | null
    lancamento: LancamentoCreateNestedOneWithoutMarcacoesInput
  }

  export type MarcacaoComplementacaoUncheckedCreateInput = {
    id?: string
    lancamentoId: string
    tipoDocumentoEsperado: string
    situacao?: string
    observacao?: string | null
  }

  export type MarcacaoComplementacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoDocumentoEsperado?: StringFieldUpdateOperationsInput | string
    situacao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    lancamento?: LancamentoUpdateOneRequiredWithoutMarcacoesNestedInput
  }

  export type MarcacaoComplementacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    tipoDocumentoEsperado?: StringFieldUpdateOperationsInput | string
    situacao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcacaoComplementacaoCreateManyInput = {
    id?: string
    lancamentoId: string
    tipoDocumentoEsperado: string
    situacao?: string
    observacao?: string | null
  }

  export type MarcacaoComplementacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoDocumentoEsperado?: StringFieldUpdateOperationsInput | string
    situacao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcacaoComplementacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    tipoDocumentoEsperado?: StringFieldUpdateOperationsInput | string
    situacao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LancamentoListRelationFilter = {
    every?: LancamentoWhereInput
    some?: LancamentoWhereInput
    none?: LancamentoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LancamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    legacyId?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    cidade?: SortOrder
    tipificacao?: SortOrder
    dadosCadastrais?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    legacyId?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    cidade?: SortOrder
    tipificacao?: SortOrder
    dadosCadastrais?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    legacyId?: SortOrder
    nomeFantasia?: SortOrder
    razaoSocial?: SortOrder
    cnpj?: SortOrder
    cidade?: SortOrder
    tipificacao?: SortOrder
    dadosCadastrais?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AgenciaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    contatos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgenciaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    contatos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgenciaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cnpj?: SortOrder
    contatos?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VeiculoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    identificacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VeiculoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    identificacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VeiculoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    identificacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColaboradorCountOrderByAggregateInput = {
    id?: SortOrder
    legacyId?: SortOrder
    nome?: SortOrder
    cpfCnpj?: SortOrder
    cargo?: SortOrder
    tipificacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColaboradorMaxOrderByAggregateInput = {
    id?: SortOrder
    legacyId?: SortOrder
    nome?: SortOrder
    cpfCnpj?: SortOrder
    cargo?: SortOrder
    tipificacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ColaboradorMinOrderByAggregateInput = {
    id?: SortOrder
    legacyId?: SortOrder
    nome?: SortOrder
    cpfCnpj?: SortOrder
    cargo?: SortOrder
    tipificacao?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ClienteNullableRelationFilter = {
    is?: ClienteWhereInput | null
    isNot?: ClienteWhereInput | null
  }

  export type AgenciaNullableRelationFilter = {
    is?: AgenciaWhereInput | null
    isNot?: AgenciaWhereInput | null
  }

  export type VeiculoNullableRelationFilter = {
    is?: VeiculoWhereInput | null
    isNot?: VeiculoWhereInput | null
  }

  export type ColaboradorNullableRelationFilter = {
    is?: ColaboradorWhereInput | null
    isNot?: ColaboradorWhereInput | null
  }

  export type DocumentoListRelationFilter = {
    every?: DocumentoWhereInput
    some?: DocumentoWhereInput
    none?: DocumentoWhereInput
  }

  export type MarcacaoComplementacaoListRelationFilter = {
    every?: MarcacaoComplementacaoWhereInput
    some?: MarcacaoComplementacaoWhereInput
    none?: MarcacaoComplementacaoWhereInput
  }

  export type HistoricoLancamentoListRelationFilter = {
    every?: HistoricoLancamentoWhereInput
    some?: HistoricoLancamentoWhereInput
    none?: HistoricoLancamentoWhereInput
  }

  export type DocumentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MarcacaoComplementacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HistoricoLancamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LancamentoCountOrderByAggregateInput = {
    id?: SortOrder
    appSheetId?: SortOrder
    tipoLancamento?: SortOrder
    clienteId?: SortOrder
    agenciaId?: SortOrder
    veiculoId?: SortOrder
    colaboradorId?: SortOrder
    numeroNotaFiscal?: SortOrder
    dataEmissao?: SortOrder
    valor?: SortOrder
    vencimento?: SortOrder
    descricao?: SortOrder
    numeroPi?: SortOrder
    numeroContrato?: SortOrder
    mesAnoReferencia?: SortOrder
    statusPagto?: SortOrder
    statusCobranca?: SortOrder
    statusNfe?: SortOrder
    dataEnvio?: SortOrder
    valorPagto?: SortOrder
    dataPagamento?: SortOrder
    dataEnvioNfe?: SortOrder
    canalCobranca?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LancamentoAvgOrderByAggregateInput = {
    valor?: SortOrder
    valorPagto?: SortOrder
  }

  export type LancamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    appSheetId?: SortOrder
    tipoLancamento?: SortOrder
    clienteId?: SortOrder
    agenciaId?: SortOrder
    veiculoId?: SortOrder
    colaboradorId?: SortOrder
    numeroNotaFiscal?: SortOrder
    dataEmissao?: SortOrder
    valor?: SortOrder
    vencimento?: SortOrder
    descricao?: SortOrder
    numeroPi?: SortOrder
    numeroContrato?: SortOrder
    mesAnoReferencia?: SortOrder
    statusPagto?: SortOrder
    statusCobranca?: SortOrder
    statusNfe?: SortOrder
    dataEnvio?: SortOrder
    valorPagto?: SortOrder
    dataPagamento?: SortOrder
    dataEnvioNfe?: SortOrder
    canalCobranca?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LancamentoMinOrderByAggregateInput = {
    id?: SortOrder
    appSheetId?: SortOrder
    tipoLancamento?: SortOrder
    clienteId?: SortOrder
    agenciaId?: SortOrder
    veiculoId?: SortOrder
    colaboradorId?: SortOrder
    numeroNotaFiscal?: SortOrder
    dataEmissao?: SortOrder
    valor?: SortOrder
    vencimento?: SortOrder
    descricao?: SortOrder
    numeroPi?: SortOrder
    numeroContrato?: SortOrder
    mesAnoReferencia?: SortOrder
    statusPagto?: SortOrder
    statusCobranca?: SortOrder
    statusNfe?: SortOrder
    dataEnvio?: SortOrder
    valorPagto?: SortOrder
    dataPagamento?: SortOrder
    dataEnvioNfe?: SortOrder
    canalCobranca?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LancamentoSumOrderByAggregateInput = {
    valor?: SortOrder
    valorPagto?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type TipoDocumentoCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    icone?: SortOrder
  }

  export type TipoDocumentoMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    icone?: SortOrder
  }

  export type TipoDocumentoMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    icone?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LancamentoRelationFilter = {
    is?: LancamentoWhereInput
    isNot?: LancamentoWhereInput
  }

  export type TipoDocumentoRelationFilter = {
    is?: TipoDocumentoWhereInput
    isNot?: TipoDocumentoWhereInput
  }

  export type DocumentoCountOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoId?: SortOrder
    caminhoOriginal?: SortOrder
    nomeOriginal?: SortOrder
    colunaOrigem?: SortOrder
    planilhaOrigem?: SortOrder
    tamanhoBytes?: SortOrder
    dataDocumento?: SortOrder
    dataInclusao?: SortOrder
    observacao?: SortOrder
    usuarioResponsavel?: SortOrder
    urlPublica?: SortOrder
    deletarApos?: SortOrder
    status?: SortOrder
  }

  export type DocumentoAvgOrderByAggregateInput = {
    tamanhoBytes?: SortOrder
  }

  export type DocumentoMaxOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoId?: SortOrder
    caminhoOriginal?: SortOrder
    nomeOriginal?: SortOrder
    colunaOrigem?: SortOrder
    planilhaOrigem?: SortOrder
    tamanhoBytes?: SortOrder
    dataDocumento?: SortOrder
    dataInclusao?: SortOrder
    observacao?: SortOrder
    usuarioResponsavel?: SortOrder
    urlPublica?: SortOrder
    deletarApos?: SortOrder
    status?: SortOrder
  }

  export type DocumentoMinOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoId?: SortOrder
    caminhoOriginal?: SortOrder
    nomeOriginal?: SortOrder
    colunaOrigem?: SortOrder
    planilhaOrigem?: SortOrder
    tamanhoBytes?: SortOrder
    dataDocumento?: SortOrder
    dataInclusao?: SortOrder
    observacao?: SortOrder
    usuarioResponsavel?: SortOrder
    urlPublica?: SortOrder
    deletarApos?: SortOrder
    status?: SortOrder
  }

  export type DocumentoSumOrderByAggregateInput = {
    tamanhoBytes?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type HistoricoLancamentoCountOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    acao?: SortOrder
    descricao?: SortOrder
    detalhes?: SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
  }

  export type HistoricoLancamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    acao?: SortOrder
    descricao?: SortOrder
    detalhes?: SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
  }

  export type HistoricoLancamentoMinOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    acao?: SortOrder
    descricao?: SortOrder
    detalhes?: SortOrder
    usuario?: SortOrder
    createdAt?: SortOrder
  }

  export type MarcacaoComplementacaoCountOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoEsperado?: SortOrder
    situacao?: SortOrder
    observacao?: SortOrder
  }

  export type MarcacaoComplementacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoEsperado?: SortOrder
    situacao?: SortOrder
    observacao?: SortOrder
  }

  export type MarcacaoComplementacaoMinOrderByAggregateInput = {
    id?: SortOrder
    lancamentoId?: SortOrder
    tipoDocumentoEsperado?: SortOrder
    situacao?: SortOrder
    observacao?: SortOrder
  }

  export type LancamentoCreateNestedManyWithoutClienteInput = {
    create?: XOR<LancamentoCreateWithoutClienteInput, LancamentoUncheckedCreateWithoutClienteInput> | LancamentoCreateWithoutClienteInput[] | LancamentoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutClienteInput | LancamentoCreateOrConnectWithoutClienteInput[]
    createMany?: LancamentoCreateManyClienteInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<LancamentoCreateWithoutClienteInput, LancamentoUncheckedCreateWithoutClienteInput> | LancamentoCreateWithoutClienteInput[] | LancamentoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutClienteInput | LancamentoCreateOrConnectWithoutClienteInput[]
    createMany?: LancamentoCreateManyClienteInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LancamentoUpdateManyWithoutClienteNestedInput = {
    create?: XOR<LancamentoCreateWithoutClienteInput, LancamentoUncheckedCreateWithoutClienteInput> | LancamentoCreateWithoutClienteInput[] | LancamentoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutClienteInput | LancamentoCreateOrConnectWithoutClienteInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutClienteInput | LancamentoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: LancamentoCreateManyClienteInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutClienteInput | LancamentoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutClienteInput | LancamentoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<LancamentoCreateWithoutClienteInput, LancamentoUncheckedCreateWithoutClienteInput> | LancamentoCreateWithoutClienteInput[] | LancamentoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutClienteInput | LancamentoCreateOrConnectWithoutClienteInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutClienteInput | LancamentoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: LancamentoCreateManyClienteInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutClienteInput | LancamentoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutClienteInput | LancamentoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoCreateNestedManyWithoutAgenciaInput = {
    create?: XOR<LancamentoCreateWithoutAgenciaInput, LancamentoUncheckedCreateWithoutAgenciaInput> | LancamentoCreateWithoutAgenciaInput[] | LancamentoUncheckedCreateWithoutAgenciaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutAgenciaInput | LancamentoCreateOrConnectWithoutAgenciaInput[]
    createMany?: LancamentoCreateManyAgenciaInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUncheckedCreateNestedManyWithoutAgenciaInput = {
    create?: XOR<LancamentoCreateWithoutAgenciaInput, LancamentoUncheckedCreateWithoutAgenciaInput> | LancamentoCreateWithoutAgenciaInput[] | LancamentoUncheckedCreateWithoutAgenciaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutAgenciaInput | LancamentoCreateOrConnectWithoutAgenciaInput[]
    createMany?: LancamentoCreateManyAgenciaInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUpdateManyWithoutAgenciaNestedInput = {
    create?: XOR<LancamentoCreateWithoutAgenciaInput, LancamentoUncheckedCreateWithoutAgenciaInput> | LancamentoCreateWithoutAgenciaInput[] | LancamentoUncheckedCreateWithoutAgenciaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutAgenciaInput | LancamentoCreateOrConnectWithoutAgenciaInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutAgenciaInput | LancamentoUpsertWithWhereUniqueWithoutAgenciaInput[]
    createMany?: LancamentoCreateManyAgenciaInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutAgenciaInput | LancamentoUpdateWithWhereUniqueWithoutAgenciaInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutAgenciaInput | LancamentoUpdateManyWithWhereWithoutAgenciaInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoUncheckedUpdateManyWithoutAgenciaNestedInput = {
    create?: XOR<LancamentoCreateWithoutAgenciaInput, LancamentoUncheckedCreateWithoutAgenciaInput> | LancamentoCreateWithoutAgenciaInput[] | LancamentoUncheckedCreateWithoutAgenciaInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutAgenciaInput | LancamentoCreateOrConnectWithoutAgenciaInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutAgenciaInput | LancamentoUpsertWithWhereUniqueWithoutAgenciaInput[]
    createMany?: LancamentoCreateManyAgenciaInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutAgenciaInput | LancamentoUpdateWithWhereUniqueWithoutAgenciaInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutAgenciaInput | LancamentoUpdateManyWithWhereWithoutAgenciaInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoCreateNestedManyWithoutVeiculoInput = {
    create?: XOR<LancamentoCreateWithoutVeiculoInput, LancamentoUncheckedCreateWithoutVeiculoInput> | LancamentoCreateWithoutVeiculoInput[] | LancamentoUncheckedCreateWithoutVeiculoInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutVeiculoInput | LancamentoCreateOrConnectWithoutVeiculoInput[]
    createMany?: LancamentoCreateManyVeiculoInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUncheckedCreateNestedManyWithoutVeiculoInput = {
    create?: XOR<LancamentoCreateWithoutVeiculoInput, LancamentoUncheckedCreateWithoutVeiculoInput> | LancamentoCreateWithoutVeiculoInput[] | LancamentoUncheckedCreateWithoutVeiculoInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutVeiculoInput | LancamentoCreateOrConnectWithoutVeiculoInput[]
    createMany?: LancamentoCreateManyVeiculoInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUpdateManyWithoutVeiculoNestedInput = {
    create?: XOR<LancamentoCreateWithoutVeiculoInput, LancamentoUncheckedCreateWithoutVeiculoInput> | LancamentoCreateWithoutVeiculoInput[] | LancamentoUncheckedCreateWithoutVeiculoInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutVeiculoInput | LancamentoCreateOrConnectWithoutVeiculoInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutVeiculoInput | LancamentoUpsertWithWhereUniqueWithoutVeiculoInput[]
    createMany?: LancamentoCreateManyVeiculoInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutVeiculoInput | LancamentoUpdateWithWhereUniqueWithoutVeiculoInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutVeiculoInput | LancamentoUpdateManyWithWhereWithoutVeiculoInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoUncheckedUpdateManyWithoutVeiculoNestedInput = {
    create?: XOR<LancamentoCreateWithoutVeiculoInput, LancamentoUncheckedCreateWithoutVeiculoInput> | LancamentoCreateWithoutVeiculoInput[] | LancamentoUncheckedCreateWithoutVeiculoInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutVeiculoInput | LancamentoCreateOrConnectWithoutVeiculoInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutVeiculoInput | LancamentoUpsertWithWhereUniqueWithoutVeiculoInput[]
    createMany?: LancamentoCreateManyVeiculoInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutVeiculoInput | LancamentoUpdateWithWhereUniqueWithoutVeiculoInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutVeiculoInput | LancamentoUpdateManyWithWhereWithoutVeiculoInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoCreateNestedManyWithoutColaboradorInput = {
    create?: XOR<LancamentoCreateWithoutColaboradorInput, LancamentoUncheckedCreateWithoutColaboradorInput> | LancamentoCreateWithoutColaboradorInput[] | LancamentoUncheckedCreateWithoutColaboradorInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutColaboradorInput | LancamentoCreateOrConnectWithoutColaboradorInput[]
    createMany?: LancamentoCreateManyColaboradorInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUncheckedCreateNestedManyWithoutColaboradorInput = {
    create?: XOR<LancamentoCreateWithoutColaboradorInput, LancamentoUncheckedCreateWithoutColaboradorInput> | LancamentoCreateWithoutColaboradorInput[] | LancamentoUncheckedCreateWithoutColaboradorInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutColaboradorInput | LancamentoCreateOrConnectWithoutColaboradorInput[]
    createMany?: LancamentoCreateManyColaboradorInputEnvelope
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
  }

  export type LancamentoUpdateManyWithoutColaboradorNestedInput = {
    create?: XOR<LancamentoCreateWithoutColaboradorInput, LancamentoUncheckedCreateWithoutColaboradorInput> | LancamentoCreateWithoutColaboradorInput[] | LancamentoUncheckedCreateWithoutColaboradorInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutColaboradorInput | LancamentoCreateOrConnectWithoutColaboradorInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutColaboradorInput | LancamentoUpsertWithWhereUniqueWithoutColaboradorInput[]
    createMany?: LancamentoCreateManyColaboradorInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutColaboradorInput | LancamentoUpdateWithWhereUniqueWithoutColaboradorInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutColaboradorInput | LancamentoUpdateManyWithWhereWithoutColaboradorInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type LancamentoUncheckedUpdateManyWithoutColaboradorNestedInput = {
    create?: XOR<LancamentoCreateWithoutColaboradorInput, LancamentoUncheckedCreateWithoutColaboradorInput> | LancamentoCreateWithoutColaboradorInput[] | LancamentoUncheckedCreateWithoutColaboradorInput[]
    connectOrCreate?: LancamentoCreateOrConnectWithoutColaboradorInput | LancamentoCreateOrConnectWithoutColaboradorInput[]
    upsert?: LancamentoUpsertWithWhereUniqueWithoutColaboradorInput | LancamentoUpsertWithWhereUniqueWithoutColaboradorInput[]
    createMany?: LancamentoCreateManyColaboradorInputEnvelope
    set?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    disconnect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    delete?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    connect?: LancamentoWhereUniqueInput | LancamentoWhereUniqueInput[]
    update?: LancamentoUpdateWithWhereUniqueWithoutColaboradorInput | LancamentoUpdateWithWhereUniqueWithoutColaboradorInput[]
    updateMany?: LancamentoUpdateManyWithWhereWithoutColaboradorInput | LancamentoUpdateManyWithWhereWithoutColaboradorInput[]
    deleteMany?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
  }

  export type ClienteCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<ClienteCreateWithoutLancamentosInput, ClienteUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutLancamentosInput
    connect?: ClienteWhereUniqueInput
  }

  export type AgenciaCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<AgenciaCreateWithoutLancamentosInput, AgenciaUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: AgenciaCreateOrConnectWithoutLancamentosInput
    connect?: AgenciaWhereUniqueInput
  }

  export type VeiculoCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<VeiculoCreateWithoutLancamentosInput, VeiculoUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: VeiculoCreateOrConnectWithoutLancamentosInput
    connect?: VeiculoWhereUniqueInput
  }

  export type ColaboradorCreateNestedOneWithoutLancamentosInput = {
    create?: XOR<ColaboradorCreateWithoutLancamentosInput, ColaboradorUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ColaboradorCreateOrConnectWithoutLancamentosInput
    connect?: ColaboradorWhereUniqueInput
  }

  export type DocumentoCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<DocumentoCreateWithoutLancamentoInput, DocumentoUncheckedCreateWithoutLancamentoInput> | DocumentoCreateWithoutLancamentoInput[] | DocumentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutLancamentoInput | DocumentoCreateOrConnectWithoutLancamentoInput[]
    createMany?: DocumentoCreateManyLancamentoInputEnvelope
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
  }

  export type MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<MarcacaoComplementacaoCreateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput> | MarcacaoComplementacaoCreateWithoutLancamentoInput[] | MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput | MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput[]
    createMany?: MarcacaoComplementacaoCreateManyLancamentoInputEnvelope
    connect?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
  }

  export type HistoricoLancamentoCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<HistoricoLancamentoCreateWithoutLancamentoInput, HistoricoLancamentoUncheckedCreateWithoutLancamentoInput> | HistoricoLancamentoCreateWithoutLancamentoInput[] | HistoricoLancamentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: HistoricoLancamentoCreateOrConnectWithoutLancamentoInput | HistoricoLancamentoCreateOrConnectWithoutLancamentoInput[]
    createMany?: HistoricoLancamentoCreateManyLancamentoInputEnvelope
    connect?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
  }

  export type DocumentoUncheckedCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<DocumentoCreateWithoutLancamentoInput, DocumentoUncheckedCreateWithoutLancamentoInput> | DocumentoCreateWithoutLancamentoInput[] | DocumentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutLancamentoInput | DocumentoCreateOrConnectWithoutLancamentoInput[]
    createMany?: DocumentoCreateManyLancamentoInputEnvelope
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
  }

  export type MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<MarcacaoComplementacaoCreateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput> | MarcacaoComplementacaoCreateWithoutLancamentoInput[] | MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput | MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput[]
    createMany?: MarcacaoComplementacaoCreateManyLancamentoInputEnvelope
    connect?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
  }

  export type HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput = {
    create?: XOR<HistoricoLancamentoCreateWithoutLancamentoInput, HistoricoLancamentoUncheckedCreateWithoutLancamentoInput> | HistoricoLancamentoCreateWithoutLancamentoInput[] | HistoricoLancamentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: HistoricoLancamentoCreateOrConnectWithoutLancamentoInput | HistoricoLancamentoCreateOrConnectWithoutLancamentoInput[]
    createMany?: HistoricoLancamentoCreateManyLancamentoInputEnvelope
    connect?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClienteUpdateOneWithoutLancamentosNestedInput = {
    create?: XOR<ClienteCreateWithoutLancamentosInput, ClienteUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutLancamentosInput
    upsert?: ClienteUpsertWithoutLancamentosInput
    disconnect?: ClienteWhereInput | boolean
    delete?: ClienteWhereInput | boolean
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutLancamentosInput, ClienteUpdateWithoutLancamentosInput>, ClienteUncheckedUpdateWithoutLancamentosInput>
  }

  export type AgenciaUpdateOneWithoutLancamentosNestedInput = {
    create?: XOR<AgenciaCreateWithoutLancamentosInput, AgenciaUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: AgenciaCreateOrConnectWithoutLancamentosInput
    upsert?: AgenciaUpsertWithoutLancamentosInput
    disconnect?: AgenciaWhereInput | boolean
    delete?: AgenciaWhereInput | boolean
    connect?: AgenciaWhereUniqueInput
    update?: XOR<XOR<AgenciaUpdateToOneWithWhereWithoutLancamentosInput, AgenciaUpdateWithoutLancamentosInput>, AgenciaUncheckedUpdateWithoutLancamentosInput>
  }

  export type VeiculoUpdateOneWithoutLancamentosNestedInput = {
    create?: XOR<VeiculoCreateWithoutLancamentosInput, VeiculoUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: VeiculoCreateOrConnectWithoutLancamentosInput
    upsert?: VeiculoUpsertWithoutLancamentosInput
    disconnect?: VeiculoWhereInput | boolean
    delete?: VeiculoWhereInput | boolean
    connect?: VeiculoWhereUniqueInput
    update?: XOR<XOR<VeiculoUpdateToOneWithWhereWithoutLancamentosInput, VeiculoUpdateWithoutLancamentosInput>, VeiculoUncheckedUpdateWithoutLancamentosInput>
  }

  export type ColaboradorUpdateOneWithoutLancamentosNestedInput = {
    create?: XOR<ColaboradorCreateWithoutLancamentosInput, ColaboradorUncheckedCreateWithoutLancamentosInput>
    connectOrCreate?: ColaboradorCreateOrConnectWithoutLancamentosInput
    upsert?: ColaboradorUpsertWithoutLancamentosInput
    disconnect?: ColaboradorWhereInput | boolean
    delete?: ColaboradorWhereInput | boolean
    connect?: ColaboradorWhereUniqueInput
    update?: XOR<XOR<ColaboradorUpdateToOneWithWhereWithoutLancamentosInput, ColaboradorUpdateWithoutLancamentosInput>, ColaboradorUncheckedUpdateWithoutLancamentosInput>
  }

  export type DocumentoUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<DocumentoCreateWithoutLancamentoInput, DocumentoUncheckedCreateWithoutLancamentoInput> | DocumentoCreateWithoutLancamentoInput[] | DocumentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutLancamentoInput | DocumentoCreateOrConnectWithoutLancamentoInput[]
    upsert?: DocumentoUpsertWithWhereUniqueWithoutLancamentoInput | DocumentoUpsertWithWhereUniqueWithoutLancamentoInput[]
    createMany?: DocumentoCreateManyLancamentoInputEnvelope
    set?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    disconnect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    delete?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    update?: DocumentoUpdateWithWhereUniqueWithoutLancamentoInput | DocumentoUpdateWithWhereUniqueWithoutLancamentoInput[]
    updateMany?: DocumentoUpdateManyWithWhereWithoutLancamentoInput | DocumentoUpdateManyWithWhereWithoutLancamentoInput[]
    deleteMany?: DocumentoScalarWhereInput | DocumentoScalarWhereInput[]
  }

  export type MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<MarcacaoComplementacaoCreateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput> | MarcacaoComplementacaoCreateWithoutLancamentoInput[] | MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput | MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput[]
    upsert?: MarcacaoComplementacaoUpsertWithWhereUniqueWithoutLancamentoInput | MarcacaoComplementacaoUpsertWithWhereUniqueWithoutLancamentoInput[]
    createMany?: MarcacaoComplementacaoCreateManyLancamentoInputEnvelope
    set?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    disconnect?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    delete?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    connect?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    update?: MarcacaoComplementacaoUpdateWithWhereUniqueWithoutLancamentoInput | MarcacaoComplementacaoUpdateWithWhereUniqueWithoutLancamentoInput[]
    updateMany?: MarcacaoComplementacaoUpdateManyWithWhereWithoutLancamentoInput | MarcacaoComplementacaoUpdateManyWithWhereWithoutLancamentoInput[]
    deleteMany?: MarcacaoComplementacaoScalarWhereInput | MarcacaoComplementacaoScalarWhereInput[]
  }

  export type HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<HistoricoLancamentoCreateWithoutLancamentoInput, HistoricoLancamentoUncheckedCreateWithoutLancamentoInput> | HistoricoLancamentoCreateWithoutLancamentoInput[] | HistoricoLancamentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: HistoricoLancamentoCreateOrConnectWithoutLancamentoInput | HistoricoLancamentoCreateOrConnectWithoutLancamentoInput[]
    upsert?: HistoricoLancamentoUpsertWithWhereUniqueWithoutLancamentoInput | HistoricoLancamentoUpsertWithWhereUniqueWithoutLancamentoInput[]
    createMany?: HistoricoLancamentoCreateManyLancamentoInputEnvelope
    set?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    disconnect?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    delete?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    connect?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    update?: HistoricoLancamentoUpdateWithWhereUniqueWithoutLancamentoInput | HistoricoLancamentoUpdateWithWhereUniqueWithoutLancamentoInput[]
    updateMany?: HistoricoLancamentoUpdateManyWithWhereWithoutLancamentoInput | HistoricoLancamentoUpdateManyWithWhereWithoutLancamentoInput[]
    deleteMany?: HistoricoLancamentoScalarWhereInput | HistoricoLancamentoScalarWhereInput[]
  }

  export type DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<DocumentoCreateWithoutLancamentoInput, DocumentoUncheckedCreateWithoutLancamentoInput> | DocumentoCreateWithoutLancamentoInput[] | DocumentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutLancamentoInput | DocumentoCreateOrConnectWithoutLancamentoInput[]
    upsert?: DocumentoUpsertWithWhereUniqueWithoutLancamentoInput | DocumentoUpsertWithWhereUniqueWithoutLancamentoInput[]
    createMany?: DocumentoCreateManyLancamentoInputEnvelope
    set?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    disconnect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    delete?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    update?: DocumentoUpdateWithWhereUniqueWithoutLancamentoInput | DocumentoUpdateWithWhereUniqueWithoutLancamentoInput[]
    updateMany?: DocumentoUpdateManyWithWhereWithoutLancamentoInput | DocumentoUpdateManyWithWhereWithoutLancamentoInput[]
    deleteMany?: DocumentoScalarWhereInput | DocumentoScalarWhereInput[]
  }

  export type MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<MarcacaoComplementacaoCreateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput> | MarcacaoComplementacaoCreateWithoutLancamentoInput[] | MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput | MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput[]
    upsert?: MarcacaoComplementacaoUpsertWithWhereUniqueWithoutLancamentoInput | MarcacaoComplementacaoUpsertWithWhereUniqueWithoutLancamentoInput[]
    createMany?: MarcacaoComplementacaoCreateManyLancamentoInputEnvelope
    set?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    disconnect?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    delete?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    connect?: MarcacaoComplementacaoWhereUniqueInput | MarcacaoComplementacaoWhereUniqueInput[]
    update?: MarcacaoComplementacaoUpdateWithWhereUniqueWithoutLancamentoInput | MarcacaoComplementacaoUpdateWithWhereUniqueWithoutLancamentoInput[]
    updateMany?: MarcacaoComplementacaoUpdateManyWithWhereWithoutLancamentoInput | MarcacaoComplementacaoUpdateManyWithWhereWithoutLancamentoInput[]
    deleteMany?: MarcacaoComplementacaoScalarWhereInput | MarcacaoComplementacaoScalarWhereInput[]
  }

  export type HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput = {
    create?: XOR<HistoricoLancamentoCreateWithoutLancamentoInput, HistoricoLancamentoUncheckedCreateWithoutLancamentoInput> | HistoricoLancamentoCreateWithoutLancamentoInput[] | HistoricoLancamentoUncheckedCreateWithoutLancamentoInput[]
    connectOrCreate?: HistoricoLancamentoCreateOrConnectWithoutLancamentoInput | HistoricoLancamentoCreateOrConnectWithoutLancamentoInput[]
    upsert?: HistoricoLancamentoUpsertWithWhereUniqueWithoutLancamentoInput | HistoricoLancamentoUpsertWithWhereUniqueWithoutLancamentoInput[]
    createMany?: HistoricoLancamentoCreateManyLancamentoInputEnvelope
    set?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    disconnect?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    delete?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    connect?: HistoricoLancamentoWhereUniqueInput | HistoricoLancamentoWhereUniqueInput[]
    update?: HistoricoLancamentoUpdateWithWhereUniqueWithoutLancamentoInput | HistoricoLancamentoUpdateWithWhereUniqueWithoutLancamentoInput[]
    updateMany?: HistoricoLancamentoUpdateManyWithWhereWithoutLancamentoInput | HistoricoLancamentoUpdateManyWithWhereWithoutLancamentoInput[]
    deleteMany?: HistoricoLancamentoScalarWhereInput | HistoricoLancamentoScalarWhereInput[]
  }

  export type DocumentoCreateNestedManyWithoutTipoDocumentoInput = {
    create?: XOR<DocumentoCreateWithoutTipoDocumentoInput, DocumentoUncheckedCreateWithoutTipoDocumentoInput> | DocumentoCreateWithoutTipoDocumentoInput[] | DocumentoUncheckedCreateWithoutTipoDocumentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutTipoDocumentoInput | DocumentoCreateOrConnectWithoutTipoDocumentoInput[]
    createMany?: DocumentoCreateManyTipoDocumentoInputEnvelope
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
  }

  export type DocumentoUncheckedCreateNestedManyWithoutTipoDocumentoInput = {
    create?: XOR<DocumentoCreateWithoutTipoDocumentoInput, DocumentoUncheckedCreateWithoutTipoDocumentoInput> | DocumentoCreateWithoutTipoDocumentoInput[] | DocumentoUncheckedCreateWithoutTipoDocumentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutTipoDocumentoInput | DocumentoCreateOrConnectWithoutTipoDocumentoInput[]
    createMany?: DocumentoCreateManyTipoDocumentoInputEnvelope
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
  }

  export type DocumentoUpdateManyWithoutTipoDocumentoNestedInput = {
    create?: XOR<DocumentoCreateWithoutTipoDocumentoInput, DocumentoUncheckedCreateWithoutTipoDocumentoInput> | DocumentoCreateWithoutTipoDocumentoInput[] | DocumentoUncheckedCreateWithoutTipoDocumentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutTipoDocumentoInput | DocumentoCreateOrConnectWithoutTipoDocumentoInput[]
    upsert?: DocumentoUpsertWithWhereUniqueWithoutTipoDocumentoInput | DocumentoUpsertWithWhereUniqueWithoutTipoDocumentoInput[]
    createMany?: DocumentoCreateManyTipoDocumentoInputEnvelope
    set?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    disconnect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    delete?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    update?: DocumentoUpdateWithWhereUniqueWithoutTipoDocumentoInput | DocumentoUpdateWithWhereUniqueWithoutTipoDocumentoInput[]
    updateMany?: DocumentoUpdateManyWithWhereWithoutTipoDocumentoInput | DocumentoUpdateManyWithWhereWithoutTipoDocumentoInput[]
    deleteMany?: DocumentoScalarWhereInput | DocumentoScalarWhereInput[]
  }

  export type DocumentoUncheckedUpdateManyWithoutTipoDocumentoNestedInput = {
    create?: XOR<DocumentoCreateWithoutTipoDocumentoInput, DocumentoUncheckedCreateWithoutTipoDocumentoInput> | DocumentoCreateWithoutTipoDocumentoInput[] | DocumentoUncheckedCreateWithoutTipoDocumentoInput[]
    connectOrCreate?: DocumentoCreateOrConnectWithoutTipoDocumentoInput | DocumentoCreateOrConnectWithoutTipoDocumentoInput[]
    upsert?: DocumentoUpsertWithWhereUniqueWithoutTipoDocumentoInput | DocumentoUpsertWithWhereUniqueWithoutTipoDocumentoInput[]
    createMany?: DocumentoCreateManyTipoDocumentoInputEnvelope
    set?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    disconnect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    delete?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    connect?: DocumentoWhereUniqueInput | DocumentoWhereUniqueInput[]
    update?: DocumentoUpdateWithWhereUniqueWithoutTipoDocumentoInput | DocumentoUpdateWithWhereUniqueWithoutTipoDocumentoInput[]
    updateMany?: DocumentoUpdateManyWithWhereWithoutTipoDocumentoInput | DocumentoUpdateManyWithWhereWithoutTipoDocumentoInput[]
    deleteMany?: DocumentoScalarWhereInput | DocumentoScalarWhereInput[]
  }

  export type LancamentoCreateNestedOneWithoutDocumentosInput = {
    create?: XOR<LancamentoCreateWithoutDocumentosInput, LancamentoUncheckedCreateWithoutDocumentosInput>
    connectOrCreate?: LancamentoCreateOrConnectWithoutDocumentosInput
    connect?: LancamentoWhereUniqueInput
  }

  export type TipoDocumentoCreateNestedOneWithoutDocumentosInput = {
    create?: XOR<TipoDocumentoCreateWithoutDocumentosInput, TipoDocumentoUncheckedCreateWithoutDocumentosInput>
    connectOrCreate?: TipoDocumentoCreateOrConnectWithoutDocumentosInput
    connect?: TipoDocumentoWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LancamentoUpdateOneRequiredWithoutDocumentosNestedInput = {
    create?: XOR<LancamentoCreateWithoutDocumentosInput, LancamentoUncheckedCreateWithoutDocumentosInput>
    connectOrCreate?: LancamentoCreateOrConnectWithoutDocumentosInput
    upsert?: LancamentoUpsertWithoutDocumentosInput
    connect?: LancamentoWhereUniqueInput
    update?: XOR<XOR<LancamentoUpdateToOneWithWhereWithoutDocumentosInput, LancamentoUpdateWithoutDocumentosInput>, LancamentoUncheckedUpdateWithoutDocumentosInput>
  }

  export type TipoDocumentoUpdateOneRequiredWithoutDocumentosNestedInput = {
    create?: XOR<TipoDocumentoCreateWithoutDocumentosInput, TipoDocumentoUncheckedCreateWithoutDocumentosInput>
    connectOrCreate?: TipoDocumentoCreateOrConnectWithoutDocumentosInput
    upsert?: TipoDocumentoUpsertWithoutDocumentosInput
    connect?: TipoDocumentoWhereUniqueInput
    update?: XOR<XOR<TipoDocumentoUpdateToOneWithWhereWithoutDocumentosInput, TipoDocumentoUpdateWithoutDocumentosInput>, TipoDocumentoUncheckedUpdateWithoutDocumentosInput>
  }

  export type LancamentoCreateNestedOneWithoutHistoricoInput = {
    create?: XOR<LancamentoCreateWithoutHistoricoInput, LancamentoUncheckedCreateWithoutHistoricoInput>
    connectOrCreate?: LancamentoCreateOrConnectWithoutHistoricoInput
    connect?: LancamentoWhereUniqueInput
  }

  export type LancamentoUpdateOneRequiredWithoutHistoricoNestedInput = {
    create?: XOR<LancamentoCreateWithoutHistoricoInput, LancamentoUncheckedCreateWithoutHistoricoInput>
    connectOrCreate?: LancamentoCreateOrConnectWithoutHistoricoInput
    upsert?: LancamentoUpsertWithoutHistoricoInput
    connect?: LancamentoWhereUniqueInput
    update?: XOR<XOR<LancamentoUpdateToOneWithWhereWithoutHistoricoInput, LancamentoUpdateWithoutHistoricoInput>, LancamentoUncheckedUpdateWithoutHistoricoInput>
  }

  export type LancamentoCreateNestedOneWithoutMarcacoesInput = {
    create?: XOR<LancamentoCreateWithoutMarcacoesInput, LancamentoUncheckedCreateWithoutMarcacoesInput>
    connectOrCreate?: LancamentoCreateOrConnectWithoutMarcacoesInput
    connect?: LancamentoWhereUniqueInput
  }

  export type LancamentoUpdateOneRequiredWithoutMarcacoesNestedInput = {
    create?: XOR<LancamentoCreateWithoutMarcacoesInput, LancamentoUncheckedCreateWithoutMarcacoesInput>
    connectOrCreate?: LancamentoCreateOrConnectWithoutMarcacoesInput
    upsert?: LancamentoUpsertWithoutMarcacoesInput
    connect?: LancamentoWhereUniqueInput
    update?: XOR<XOR<LancamentoUpdateToOneWithWhereWithoutMarcacoesInput, LancamentoUpdateWithoutMarcacoesInput>, LancamentoUncheckedUpdateWithoutMarcacoesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LancamentoCreateWithoutClienteInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agencia?: AgenciaCreateNestedOneWithoutLancamentosInput
    veiculo?: VeiculoCreateNestedOneWithoutLancamentosInput
    colaborador?: ColaboradorCreateNestedOneWithoutLancamentosInput
    documentos?: DocumentoCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateWithoutClienteInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    agenciaId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documentos?: DocumentoUncheckedCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoCreateOrConnectWithoutClienteInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutClienteInput, LancamentoUncheckedCreateWithoutClienteInput>
  }

  export type LancamentoCreateManyClienteInputEnvelope = {
    data: LancamentoCreateManyClienteInput | LancamentoCreateManyClienteInput[]
  }

  export type LancamentoUpsertWithWhereUniqueWithoutClienteInput = {
    where: LancamentoWhereUniqueInput
    update: XOR<LancamentoUpdateWithoutClienteInput, LancamentoUncheckedUpdateWithoutClienteInput>
    create: XOR<LancamentoCreateWithoutClienteInput, LancamentoUncheckedCreateWithoutClienteInput>
  }

  export type LancamentoUpdateWithWhereUniqueWithoutClienteInput = {
    where: LancamentoWhereUniqueInput
    data: XOR<LancamentoUpdateWithoutClienteInput, LancamentoUncheckedUpdateWithoutClienteInput>
  }

  export type LancamentoUpdateManyWithWhereWithoutClienteInput = {
    where: LancamentoScalarWhereInput
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyWithoutClienteInput>
  }

  export type LancamentoScalarWhereInput = {
    AND?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
    OR?: LancamentoScalarWhereInput[]
    NOT?: LancamentoScalarWhereInput | LancamentoScalarWhereInput[]
    id?: StringFilter<"Lancamento"> | string
    appSheetId?: StringNullableFilter<"Lancamento"> | string | null
    tipoLancamento?: StringFilter<"Lancamento"> | string
    clienteId?: StringNullableFilter<"Lancamento"> | string | null
    agenciaId?: StringNullableFilter<"Lancamento"> | string | null
    veiculoId?: StringNullableFilter<"Lancamento"> | string | null
    colaboradorId?: StringNullableFilter<"Lancamento"> | string | null
    numeroNotaFiscal?: StringNullableFilter<"Lancamento"> | string | null
    dataEmissao?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    valor?: FloatNullableFilter<"Lancamento"> | number | null
    vencimento?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    descricao?: StringNullableFilter<"Lancamento"> | string | null
    numeroPi?: StringNullableFilter<"Lancamento"> | string | null
    numeroContrato?: StringNullableFilter<"Lancamento"> | string | null
    mesAnoReferencia?: StringNullableFilter<"Lancamento"> | string | null
    statusPagto?: StringNullableFilter<"Lancamento"> | string | null
    statusCobranca?: StringNullableFilter<"Lancamento"> | string | null
    statusNfe?: StringNullableFilter<"Lancamento"> | string | null
    dataEnvio?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    valorPagto?: FloatNullableFilter<"Lancamento"> | number | null
    dataPagamento?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    dataEnvioNfe?: DateTimeNullableFilter<"Lancamento"> | Date | string | null
    canalCobranca?: StringNullableFilter<"Lancamento"> | string | null
    createdAt?: DateTimeFilter<"Lancamento"> | Date | string
    updatedAt?: DateTimeFilter<"Lancamento"> | Date | string
  }

  export type LancamentoCreateWithoutAgenciaInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutLancamentosInput
    veiculo?: VeiculoCreateNestedOneWithoutLancamentosInput
    colaborador?: ColaboradorCreateNestedOneWithoutLancamentosInput
    documentos?: DocumentoCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateWithoutAgenciaInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documentos?: DocumentoUncheckedCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoCreateOrConnectWithoutAgenciaInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutAgenciaInput, LancamentoUncheckedCreateWithoutAgenciaInput>
  }

  export type LancamentoCreateManyAgenciaInputEnvelope = {
    data: LancamentoCreateManyAgenciaInput | LancamentoCreateManyAgenciaInput[]
  }

  export type LancamentoUpsertWithWhereUniqueWithoutAgenciaInput = {
    where: LancamentoWhereUniqueInput
    update: XOR<LancamentoUpdateWithoutAgenciaInput, LancamentoUncheckedUpdateWithoutAgenciaInput>
    create: XOR<LancamentoCreateWithoutAgenciaInput, LancamentoUncheckedCreateWithoutAgenciaInput>
  }

  export type LancamentoUpdateWithWhereUniqueWithoutAgenciaInput = {
    where: LancamentoWhereUniqueInput
    data: XOR<LancamentoUpdateWithoutAgenciaInput, LancamentoUncheckedUpdateWithoutAgenciaInput>
  }

  export type LancamentoUpdateManyWithWhereWithoutAgenciaInput = {
    where: LancamentoScalarWhereInput
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyWithoutAgenciaInput>
  }

  export type LancamentoCreateWithoutVeiculoInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutLancamentosInput
    agencia?: AgenciaCreateNestedOneWithoutLancamentosInput
    colaborador?: ColaboradorCreateNestedOneWithoutLancamentosInput
    documentos?: DocumentoCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateWithoutVeiculoInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documentos?: DocumentoUncheckedCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoCreateOrConnectWithoutVeiculoInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutVeiculoInput, LancamentoUncheckedCreateWithoutVeiculoInput>
  }

  export type LancamentoCreateManyVeiculoInputEnvelope = {
    data: LancamentoCreateManyVeiculoInput | LancamentoCreateManyVeiculoInput[]
  }

  export type LancamentoUpsertWithWhereUniqueWithoutVeiculoInput = {
    where: LancamentoWhereUniqueInput
    update: XOR<LancamentoUpdateWithoutVeiculoInput, LancamentoUncheckedUpdateWithoutVeiculoInput>
    create: XOR<LancamentoCreateWithoutVeiculoInput, LancamentoUncheckedCreateWithoutVeiculoInput>
  }

  export type LancamentoUpdateWithWhereUniqueWithoutVeiculoInput = {
    where: LancamentoWhereUniqueInput
    data: XOR<LancamentoUpdateWithoutVeiculoInput, LancamentoUncheckedUpdateWithoutVeiculoInput>
  }

  export type LancamentoUpdateManyWithWhereWithoutVeiculoInput = {
    where: LancamentoScalarWhereInput
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyWithoutVeiculoInput>
  }

  export type LancamentoCreateWithoutColaboradorInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutLancamentosInput
    agencia?: AgenciaCreateNestedOneWithoutLancamentosInput
    veiculo?: VeiculoCreateNestedOneWithoutLancamentosInput
    documentos?: DocumentoCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateWithoutColaboradorInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    veiculoId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documentos?: DocumentoUncheckedCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoCreateOrConnectWithoutColaboradorInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutColaboradorInput, LancamentoUncheckedCreateWithoutColaboradorInput>
  }

  export type LancamentoCreateManyColaboradorInputEnvelope = {
    data: LancamentoCreateManyColaboradorInput | LancamentoCreateManyColaboradorInput[]
  }

  export type LancamentoUpsertWithWhereUniqueWithoutColaboradorInput = {
    where: LancamentoWhereUniqueInput
    update: XOR<LancamentoUpdateWithoutColaboradorInput, LancamentoUncheckedUpdateWithoutColaboradorInput>
    create: XOR<LancamentoCreateWithoutColaboradorInput, LancamentoUncheckedCreateWithoutColaboradorInput>
  }

  export type LancamentoUpdateWithWhereUniqueWithoutColaboradorInput = {
    where: LancamentoWhereUniqueInput
    data: XOR<LancamentoUpdateWithoutColaboradorInput, LancamentoUncheckedUpdateWithoutColaboradorInput>
  }

  export type LancamentoUpdateManyWithWhereWithoutColaboradorInput = {
    where: LancamentoScalarWhereInput
    data: XOR<LancamentoUpdateManyMutationInput, LancamentoUncheckedUpdateManyWithoutColaboradorInput>
  }

  export type ClienteCreateWithoutLancamentosInput = {
    id?: string
    legacyId?: string | null
    nomeFantasia?: string | null
    razaoSocial: string
    cnpj?: string | null
    cidade?: string | null
    tipificacao?: string | null
    dadosCadastrais?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteUncheckedCreateWithoutLancamentosInput = {
    id?: string
    legacyId?: string | null
    nomeFantasia?: string | null
    razaoSocial: string
    cnpj?: string | null
    cidade?: string | null
    tipificacao?: string | null
    dadosCadastrais?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteCreateOrConnectWithoutLancamentosInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutLancamentosInput, ClienteUncheckedCreateWithoutLancamentosInput>
  }

  export type AgenciaCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    contatos?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgenciaUncheckedCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    cnpj?: string | null
    contatos?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgenciaCreateOrConnectWithoutLancamentosInput = {
    where: AgenciaWhereUniqueInput
    create: XOR<AgenciaCreateWithoutLancamentosInput, AgenciaUncheckedCreateWithoutLancamentosInput>
  }

  export type VeiculoCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    identificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VeiculoUncheckedCreateWithoutLancamentosInput = {
    id?: string
    nome: string
    identificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VeiculoCreateOrConnectWithoutLancamentosInput = {
    where: VeiculoWhereUniqueInput
    create: XOR<VeiculoCreateWithoutLancamentosInput, VeiculoUncheckedCreateWithoutLancamentosInput>
  }

  export type ColaboradorCreateWithoutLancamentosInput = {
    id?: string
    legacyId?: string | null
    nome: string
    cpfCnpj?: string | null
    cargo?: string | null
    tipificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColaboradorUncheckedCreateWithoutLancamentosInput = {
    id?: string
    legacyId?: string | null
    nome: string
    cpfCnpj?: string | null
    cargo?: string | null
    tipificacao?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ColaboradorCreateOrConnectWithoutLancamentosInput = {
    where: ColaboradorWhereUniqueInput
    create: XOR<ColaboradorCreateWithoutLancamentosInput, ColaboradorUncheckedCreateWithoutLancamentosInput>
  }

  export type DocumentoCreateWithoutLancamentoInput = {
    id?: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
    tipoDocumento: TipoDocumentoCreateNestedOneWithoutDocumentosInput
  }

  export type DocumentoUncheckedCreateWithoutLancamentoInput = {
    id?: string
    tipoDocumentoId: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
  }

  export type DocumentoCreateOrConnectWithoutLancamentoInput = {
    where: DocumentoWhereUniqueInput
    create: XOR<DocumentoCreateWithoutLancamentoInput, DocumentoUncheckedCreateWithoutLancamentoInput>
  }

  export type DocumentoCreateManyLancamentoInputEnvelope = {
    data: DocumentoCreateManyLancamentoInput | DocumentoCreateManyLancamentoInput[]
  }

  export type MarcacaoComplementacaoCreateWithoutLancamentoInput = {
    id?: string
    tipoDocumentoEsperado: string
    situacao?: string
    observacao?: string | null
  }

  export type MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput = {
    id?: string
    tipoDocumentoEsperado: string
    situacao?: string
    observacao?: string | null
  }

  export type MarcacaoComplementacaoCreateOrConnectWithoutLancamentoInput = {
    where: MarcacaoComplementacaoWhereUniqueInput
    create: XOR<MarcacaoComplementacaoCreateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput>
  }

  export type MarcacaoComplementacaoCreateManyLancamentoInputEnvelope = {
    data: MarcacaoComplementacaoCreateManyLancamentoInput | MarcacaoComplementacaoCreateManyLancamentoInput[]
  }

  export type HistoricoLancamentoCreateWithoutLancamentoInput = {
    id?: string
    acao: string
    descricao: string
    detalhes?: string | null
    usuario?: string | null
    createdAt?: Date | string
  }

  export type HistoricoLancamentoUncheckedCreateWithoutLancamentoInput = {
    id?: string
    acao: string
    descricao: string
    detalhes?: string | null
    usuario?: string | null
    createdAt?: Date | string
  }

  export type HistoricoLancamentoCreateOrConnectWithoutLancamentoInput = {
    where: HistoricoLancamentoWhereUniqueInput
    create: XOR<HistoricoLancamentoCreateWithoutLancamentoInput, HistoricoLancamentoUncheckedCreateWithoutLancamentoInput>
  }

  export type HistoricoLancamentoCreateManyLancamentoInputEnvelope = {
    data: HistoricoLancamentoCreateManyLancamentoInput | HistoricoLancamentoCreateManyLancamentoInput[]
  }

  export type ClienteUpsertWithoutLancamentosInput = {
    update: XOR<ClienteUpdateWithoutLancamentosInput, ClienteUncheckedUpdateWithoutLancamentosInput>
    create: XOR<ClienteCreateWithoutLancamentosInput, ClienteUncheckedCreateWithoutLancamentosInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutLancamentosInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutLancamentosInput, ClienteUncheckedUpdateWithoutLancamentosInput>
  }

  export type ClienteUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nomeFantasia?: NullableStringFieldUpdateOperationsInput | string | null
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    dadosCadastrais?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nomeFantasia?: NullableStringFieldUpdateOperationsInput | string | null
    razaoSocial?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    dadosCadastrais?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgenciaUpsertWithoutLancamentosInput = {
    update: XOR<AgenciaUpdateWithoutLancamentosInput, AgenciaUncheckedUpdateWithoutLancamentosInput>
    create: XOR<AgenciaCreateWithoutLancamentosInput, AgenciaUncheckedCreateWithoutLancamentosInput>
    where?: AgenciaWhereInput
  }

  export type AgenciaUpdateToOneWithWhereWithoutLancamentosInput = {
    where?: AgenciaWhereInput
    data: XOR<AgenciaUpdateWithoutLancamentosInput, AgenciaUncheckedUpdateWithoutLancamentosInput>
  }

  export type AgenciaUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    contatos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgenciaUncheckedUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    contatos?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoUpsertWithoutLancamentosInput = {
    update: XOR<VeiculoUpdateWithoutLancamentosInput, VeiculoUncheckedUpdateWithoutLancamentosInput>
    create: XOR<VeiculoCreateWithoutLancamentosInput, VeiculoUncheckedCreateWithoutLancamentosInput>
    where?: VeiculoWhereInput
  }

  export type VeiculoUpdateToOneWithWhereWithoutLancamentosInput = {
    where?: VeiculoWhereInput
    data: XOR<VeiculoUpdateWithoutLancamentosInput, VeiculoUncheckedUpdateWithoutLancamentosInput>
  }

  export type VeiculoUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    identificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoUncheckedUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    identificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaboradorUpsertWithoutLancamentosInput = {
    update: XOR<ColaboradorUpdateWithoutLancamentosInput, ColaboradorUncheckedUpdateWithoutLancamentosInput>
    create: XOR<ColaboradorCreateWithoutLancamentosInput, ColaboradorUncheckedCreateWithoutLancamentosInput>
    where?: ColaboradorWhereInput
  }

  export type ColaboradorUpdateToOneWithWhereWithoutLancamentosInput = {
    where?: ColaboradorWhereInput
    data: XOR<ColaboradorUpdateWithoutLancamentosInput, ColaboradorUncheckedUpdateWithoutLancamentosInput>
  }

  export type ColaboradorUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ColaboradorUncheckedUpdateWithoutLancamentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    legacyId?: NullableStringFieldUpdateOperationsInput | string | null
    nome?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: NullableStringFieldUpdateOperationsInput | string | null
    cargo?: NullableStringFieldUpdateOperationsInput | string | null
    tipificacao?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentoUpsertWithWhereUniqueWithoutLancamentoInput = {
    where: DocumentoWhereUniqueInput
    update: XOR<DocumentoUpdateWithoutLancamentoInput, DocumentoUncheckedUpdateWithoutLancamentoInput>
    create: XOR<DocumentoCreateWithoutLancamentoInput, DocumentoUncheckedCreateWithoutLancamentoInput>
  }

  export type DocumentoUpdateWithWhereUniqueWithoutLancamentoInput = {
    where: DocumentoWhereUniqueInput
    data: XOR<DocumentoUpdateWithoutLancamentoInput, DocumentoUncheckedUpdateWithoutLancamentoInput>
  }

  export type DocumentoUpdateManyWithWhereWithoutLancamentoInput = {
    where: DocumentoScalarWhereInput
    data: XOR<DocumentoUpdateManyMutationInput, DocumentoUncheckedUpdateManyWithoutLancamentoInput>
  }

  export type DocumentoScalarWhereInput = {
    AND?: DocumentoScalarWhereInput | DocumentoScalarWhereInput[]
    OR?: DocumentoScalarWhereInput[]
    NOT?: DocumentoScalarWhereInput | DocumentoScalarWhereInput[]
    id?: StringFilter<"Documento"> | string
    lancamentoId?: StringFilter<"Documento"> | string
    tipoDocumentoId?: StringFilter<"Documento"> | string
    caminhoOriginal?: StringNullableFilter<"Documento"> | string | null
    nomeOriginal?: StringFilter<"Documento"> | string
    colunaOrigem?: StringNullableFilter<"Documento"> | string | null
    planilhaOrigem?: StringNullableFilter<"Documento"> | string | null
    tamanhoBytes?: IntFilter<"Documento"> | number
    dataDocumento?: DateTimeNullableFilter<"Documento"> | Date | string | null
    dataInclusao?: DateTimeFilter<"Documento"> | Date | string
    observacao?: StringNullableFilter<"Documento"> | string | null
    usuarioResponsavel?: StringNullableFilter<"Documento"> | string | null
    urlPublica?: StringNullableFilter<"Documento"> | string | null
    deletarApos?: DateTimeNullableFilter<"Documento"> | Date | string | null
    status?: StringFilter<"Documento"> | string
  }

  export type MarcacaoComplementacaoUpsertWithWhereUniqueWithoutLancamentoInput = {
    where: MarcacaoComplementacaoWhereUniqueInput
    update: XOR<MarcacaoComplementacaoUpdateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedUpdateWithoutLancamentoInput>
    create: XOR<MarcacaoComplementacaoCreateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedCreateWithoutLancamentoInput>
  }

  export type MarcacaoComplementacaoUpdateWithWhereUniqueWithoutLancamentoInput = {
    where: MarcacaoComplementacaoWhereUniqueInput
    data: XOR<MarcacaoComplementacaoUpdateWithoutLancamentoInput, MarcacaoComplementacaoUncheckedUpdateWithoutLancamentoInput>
  }

  export type MarcacaoComplementacaoUpdateManyWithWhereWithoutLancamentoInput = {
    where: MarcacaoComplementacaoScalarWhereInput
    data: XOR<MarcacaoComplementacaoUpdateManyMutationInput, MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoInput>
  }

  export type MarcacaoComplementacaoScalarWhereInput = {
    AND?: MarcacaoComplementacaoScalarWhereInput | MarcacaoComplementacaoScalarWhereInput[]
    OR?: MarcacaoComplementacaoScalarWhereInput[]
    NOT?: MarcacaoComplementacaoScalarWhereInput | MarcacaoComplementacaoScalarWhereInput[]
    id?: StringFilter<"MarcacaoComplementacao"> | string
    lancamentoId?: StringFilter<"MarcacaoComplementacao"> | string
    tipoDocumentoEsperado?: StringFilter<"MarcacaoComplementacao"> | string
    situacao?: StringFilter<"MarcacaoComplementacao"> | string
    observacao?: StringNullableFilter<"MarcacaoComplementacao"> | string | null
  }

  export type HistoricoLancamentoUpsertWithWhereUniqueWithoutLancamentoInput = {
    where: HistoricoLancamentoWhereUniqueInput
    update: XOR<HistoricoLancamentoUpdateWithoutLancamentoInput, HistoricoLancamentoUncheckedUpdateWithoutLancamentoInput>
    create: XOR<HistoricoLancamentoCreateWithoutLancamentoInput, HistoricoLancamentoUncheckedCreateWithoutLancamentoInput>
  }

  export type HistoricoLancamentoUpdateWithWhereUniqueWithoutLancamentoInput = {
    where: HistoricoLancamentoWhereUniqueInput
    data: XOR<HistoricoLancamentoUpdateWithoutLancamentoInput, HistoricoLancamentoUncheckedUpdateWithoutLancamentoInput>
  }

  export type HistoricoLancamentoUpdateManyWithWhereWithoutLancamentoInput = {
    where: HistoricoLancamentoScalarWhereInput
    data: XOR<HistoricoLancamentoUpdateManyMutationInput, HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoInput>
  }

  export type HistoricoLancamentoScalarWhereInput = {
    AND?: HistoricoLancamentoScalarWhereInput | HistoricoLancamentoScalarWhereInput[]
    OR?: HistoricoLancamentoScalarWhereInput[]
    NOT?: HistoricoLancamentoScalarWhereInput | HistoricoLancamentoScalarWhereInput[]
    id?: StringFilter<"HistoricoLancamento"> | string
    lancamentoId?: StringFilter<"HistoricoLancamento"> | string
    acao?: StringFilter<"HistoricoLancamento"> | string
    descricao?: StringFilter<"HistoricoLancamento"> | string
    detalhes?: StringNullableFilter<"HistoricoLancamento"> | string | null
    usuario?: StringNullableFilter<"HistoricoLancamento"> | string | null
    createdAt?: DateTimeFilter<"HistoricoLancamento"> | Date | string
  }

  export type DocumentoCreateWithoutTipoDocumentoInput = {
    id?: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
    lancamento: LancamentoCreateNestedOneWithoutDocumentosInput
  }

  export type DocumentoUncheckedCreateWithoutTipoDocumentoInput = {
    id?: string
    lancamentoId: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
  }

  export type DocumentoCreateOrConnectWithoutTipoDocumentoInput = {
    where: DocumentoWhereUniqueInput
    create: XOR<DocumentoCreateWithoutTipoDocumentoInput, DocumentoUncheckedCreateWithoutTipoDocumentoInput>
  }

  export type DocumentoCreateManyTipoDocumentoInputEnvelope = {
    data: DocumentoCreateManyTipoDocumentoInput | DocumentoCreateManyTipoDocumentoInput[]
  }

  export type DocumentoUpsertWithWhereUniqueWithoutTipoDocumentoInput = {
    where: DocumentoWhereUniqueInput
    update: XOR<DocumentoUpdateWithoutTipoDocumentoInput, DocumentoUncheckedUpdateWithoutTipoDocumentoInput>
    create: XOR<DocumentoCreateWithoutTipoDocumentoInput, DocumentoUncheckedCreateWithoutTipoDocumentoInput>
  }

  export type DocumentoUpdateWithWhereUniqueWithoutTipoDocumentoInput = {
    where: DocumentoWhereUniqueInput
    data: XOR<DocumentoUpdateWithoutTipoDocumentoInput, DocumentoUncheckedUpdateWithoutTipoDocumentoInput>
  }

  export type DocumentoUpdateManyWithWhereWithoutTipoDocumentoInput = {
    where: DocumentoScalarWhereInput
    data: XOR<DocumentoUpdateManyMutationInput, DocumentoUncheckedUpdateManyWithoutTipoDocumentoInput>
  }

  export type LancamentoCreateWithoutDocumentosInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutLancamentosInput
    agencia?: AgenciaCreateNestedOneWithoutLancamentosInput
    veiculo?: VeiculoCreateNestedOneWithoutLancamentosInput
    colaborador?: ColaboradorCreateNestedOneWithoutLancamentosInput
    marcacoes?: MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateWithoutDocumentosInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marcacoes?: MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoCreateOrConnectWithoutDocumentosInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutDocumentosInput, LancamentoUncheckedCreateWithoutDocumentosInput>
  }

  export type TipoDocumentoCreateWithoutDocumentosInput = {
    id?: string
    nome: string
    icone?: string | null
  }

  export type TipoDocumentoUncheckedCreateWithoutDocumentosInput = {
    id?: string
    nome: string
    icone?: string | null
  }

  export type TipoDocumentoCreateOrConnectWithoutDocumentosInput = {
    where: TipoDocumentoWhereUniqueInput
    create: XOR<TipoDocumentoCreateWithoutDocumentosInput, TipoDocumentoUncheckedCreateWithoutDocumentosInput>
  }

  export type LancamentoUpsertWithoutDocumentosInput = {
    update: XOR<LancamentoUpdateWithoutDocumentosInput, LancamentoUncheckedUpdateWithoutDocumentosInput>
    create: XOR<LancamentoCreateWithoutDocumentosInput, LancamentoUncheckedCreateWithoutDocumentosInput>
    where?: LancamentoWhereInput
  }

  export type LancamentoUpdateToOneWithWhereWithoutDocumentosInput = {
    where?: LancamentoWhereInput
    data: XOR<LancamentoUpdateWithoutDocumentosInput, LancamentoUncheckedUpdateWithoutDocumentosInput>
  }

  export type LancamentoUpdateWithoutDocumentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutLancamentosNestedInput
    agencia?: AgenciaUpdateOneWithoutLancamentosNestedInput
    veiculo?: VeiculoUpdateOneWithoutLancamentosNestedInput
    colaborador?: ColaboradorUpdateOneWithoutLancamentosNestedInput
    marcacoes?: MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutDocumentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marcacoes?: MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type TipoDocumentoUpsertWithoutDocumentosInput = {
    update: XOR<TipoDocumentoUpdateWithoutDocumentosInput, TipoDocumentoUncheckedUpdateWithoutDocumentosInput>
    create: XOR<TipoDocumentoCreateWithoutDocumentosInput, TipoDocumentoUncheckedCreateWithoutDocumentosInput>
    where?: TipoDocumentoWhereInput
  }

  export type TipoDocumentoUpdateToOneWithWhereWithoutDocumentosInput = {
    where?: TipoDocumentoWhereInput
    data: XOR<TipoDocumentoUpdateWithoutDocumentosInput, TipoDocumentoUncheckedUpdateWithoutDocumentosInput>
  }

  export type TipoDocumentoUpdateWithoutDocumentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    icone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TipoDocumentoUncheckedUpdateWithoutDocumentosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    icone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LancamentoCreateWithoutHistoricoInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutLancamentosInput
    agencia?: AgenciaCreateNestedOneWithoutLancamentosInput
    veiculo?: VeiculoCreateNestedOneWithoutLancamentosInput
    colaborador?: ColaboradorCreateNestedOneWithoutLancamentosInput
    documentos?: DocumentoCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateWithoutHistoricoInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documentos?: DocumentoUncheckedCreateNestedManyWithoutLancamentoInput
    marcacoes?: MarcacaoComplementacaoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoCreateOrConnectWithoutHistoricoInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutHistoricoInput, LancamentoUncheckedCreateWithoutHistoricoInput>
  }

  export type LancamentoUpsertWithoutHistoricoInput = {
    update: XOR<LancamentoUpdateWithoutHistoricoInput, LancamentoUncheckedUpdateWithoutHistoricoInput>
    create: XOR<LancamentoCreateWithoutHistoricoInput, LancamentoUncheckedCreateWithoutHistoricoInput>
    where?: LancamentoWhereInput
  }

  export type LancamentoUpdateToOneWithWhereWithoutHistoricoInput = {
    where?: LancamentoWhereInput
    data: XOR<LancamentoUpdateWithoutHistoricoInput, LancamentoUncheckedUpdateWithoutHistoricoInput>
  }

  export type LancamentoUpdateWithoutHistoricoInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutLancamentosNestedInput
    agencia?: AgenciaUpdateOneWithoutLancamentosNestedInput
    veiculo?: VeiculoUpdateOneWithoutLancamentosNestedInput
    colaborador?: ColaboradorUpdateOneWithoutLancamentosNestedInput
    documentos?: DocumentoUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutHistoricoInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentos?: DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoCreateWithoutMarcacoesInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente?: ClienteCreateNestedOneWithoutLancamentosInput
    agencia?: AgenciaCreateNestedOneWithoutLancamentosInput
    veiculo?: VeiculoCreateNestedOneWithoutLancamentosInput
    colaborador?: ColaboradorCreateNestedOneWithoutLancamentosInput
    documentos?: DocumentoCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoUncheckedCreateWithoutMarcacoesInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    documentos?: DocumentoUncheckedCreateNestedManyWithoutLancamentoInput
    historico?: HistoricoLancamentoUncheckedCreateNestedManyWithoutLancamentoInput
  }

  export type LancamentoCreateOrConnectWithoutMarcacoesInput = {
    where: LancamentoWhereUniqueInput
    create: XOR<LancamentoCreateWithoutMarcacoesInput, LancamentoUncheckedCreateWithoutMarcacoesInput>
  }

  export type LancamentoUpsertWithoutMarcacoesInput = {
    update: XOR<LancamentoUpdateWithoutMarcacoesInput, LancamentoUncheckedUpdateWithoutMarcacoesInput>
    create: XOR<LancamentoCreateWithoutMarcacoesInput, LancamentoUncheckedCreateWithoutMarcacoesInput>
    where?: LancamentoWhereInput
  }

  export type LancamentoUpdateToOneWithWhereWithoutMarcacoesInput = {
    where?: LancamentoWhereInput
    data: XOR<LancamentoUpdateWithoutMarcacoesInput, LancamentoUncheckedUpdateWithoutMarcacoesInput>
  }

  export type LancamentoUpdateWithoutMarcacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutLancamentosNestedInput
    agencia?: AgenciaUpdateOneWithoutLancamentosNestedInput
    veiculo?: VeiculoUpdateOneWithoutLancamentosNestedInput
    colaborador?: ColaboradorUpdateOneWithoutLancamentosNestedInput
    documentos?: DocumentoUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutMarcacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentos?: DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoCreateManyClienteInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    agenciaId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LancamentoUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agencia?: AgenciaUpdateOneWithoutLancamentosNestedInput
    veiculo?: VeiculoUpdateOneWithoutLancamentosNestedInput
    colaborador?: ColaboradorUpdateOneWithoutLancamentosNestedInput
    documentos?: DocumentoUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentos?: DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateManyAgenciaInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    veiculoId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LancamentoUpdateWithoutAgenciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutLancamentosNestedInput
    veiculo?: VeiculoUpdateOneWithoutLancamentosNestedInput
    colaborador?: ColaboradorUpdateOneWithoutLancamentosNestedInput
    documentos?: DocumentoUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutAgenciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentos?: DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateManyWithoutAgenciaInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateManyVeiculoInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    colaboradorId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LancamentoUpdateWithoutVeiculoInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutLancamentosNestedInput
    agencia?: AgenciaUpdateOneWithoutLancamentosNestedInput
    colaborador?: ColaboradorUpdateOneWithoutLancamentosNestedInput
    documentos?: DocumentoUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutVeiculoInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentos?: DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateManyWithoutVeiculoInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    colaboradorId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LancamentoCreateManyColaboradorInput = {
    id?: string
    appSheetId?: string | null
    tipoLancamento?: string
    clienteId?: string | null
    agenciaId?: string | null
    veiculoId?: string | null
    numeroNotaFiscal?: string | null
    dataEmissao?: Date | string | null
    valor?: number | null
    vencimento?: Date | string | null
    descricao?: string | null
    numeroPi?: string | null
    numeroContrato?: string | null
    mesAnoReferencia?: string | null
    statusPagto?: string | null
    statusCobranca?: string | null
    statusNfe?: string | null
    dataEnvio?: Date | string | null
    valorPagto?: number | null
    dataPagamento?: Date | string | null
    dataEnvioNfe?: Date | string | null
    canalCobranca?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LancamentoUpdateWithoutColaboradorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneWithoutLancamentosNestedInput
    agencia?: AgenciaUpdateOneWithoutLancamentosNestedInput
    veiculo?: VeiculoUpdateOneWithoutLancamentosNestedInput
    documentos?: DocumentoUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateWithoutColaboradorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documentos?: DocumentoUncheckedUpdateManyWithoutLancamentoNestedInput
    marcacoes?: MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoNestedInput
    historico?: HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoNestedInput
  }

  export type LancamentoUncheckedUpdateManyWithoutColaboradorInput = {
    id?: StringFieldUpdateOperationsInput | string
    appSheetId?: NullableStringFieldUpdateOperationsInput | string | null
    tipoLancamento?: StringFieldUpdateOperationsInput | string
    clienteId?: NullableStringFieldUpdateOperationsInput | string | null
    agenciaId?: NullableStringFieldUpdateOperationsInput | string | null
    veiculoId?: NullableStringFieldUpdateOperationsInput | string | null
    numeroNotaFiscal?: NullableStringFieldUpdateOperationsInput | string | null
    dataEmissao?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableFloatFieldUpdateOperationsInput | number | null
    vencimento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    numeroPi?: NullableStringFieldUpdateOperationsInput | string | null
    numeroContrato?: NullableStringFieldUpdateOperationsInput | string | null
    mesAnoReferencia?: NullableStringFieldUpdateOperationsInput | string | null
    statusPagto?: NullableStringFieldUpdateOperationsInput | string | null
    statusCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    statusNfe?: NullableStringFieldUpdateOperationsInput | string | null
    dataEnvio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valorPagto?: NullableFloatFieldUpdateOperationsInput | number | null
    dataPagamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataEnvioNfe?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    canalCobranca?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentoCreateManyLancamentoInput = {
    id?: string
    tipoDocumentoId: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
  }

  export type MarcacaoComplementacaoCreateManyLancamentoInput = {
    id?: string
    tipoDocumentoEsperado: string
    situacao?: string
    observacao?: string | null
  }

  export type HistoricoLancamentoCreateManyLancamentoInput = {
    id?: string
    acao: string
    descricao: string
    detalhes?: string | null
    usuario?: string | null
    createdAt?: Date | string
  }

  export type DocumentoUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    tipoDocumento?: TipoDocumentoUpdateOneRequiredWithoutDocumentosNestedInput
  }

  export type DocumentoUncheckedUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoDocumentoId?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentoUncheckedUpdateManyWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoDocumentoId?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MarcacaoComplementacaoUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoDocumentoEsperado?: StringFieldUpdateOperationsInput | string
    situacao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcacaoComplementacaoUncheckedUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoDocumentoEsperado?: StringFieldUpdateOperationsInput | string
    situacao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarcacaoComplementacaoUncheckedUpdateManyWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipoDocumentoEsperado?: StringFieldUpdateOperationsInput | string
    situacao?: StringFieldUpdateOperationsInput | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HistoricoLancamentoUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    acao?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoLancamentoUncheckedUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    acao?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HistoricoLancamentoUncheckedUpdateManyWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    acao?: StringFieldUpdateOperationsInput | string
    descricao?: StringFieldUpdateOperationsInput | string
    detalhes?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentoCreateManyTipoDocumentoInput = {
    id?: string
    lancamentoId: string
    caminhoOriginal?: string | null
    nomeOriginal: string
    colunaOrigem?: string | null
    planilhaOrigem?: string | null
    tamanhoBytes?: number
    dataDocumento?: Date | string | null
    dataInclusao?: Date | string
    observacao?: string | null
    usuarioResponsavel?: string | null
    urlPublica?: string | null
    deletarApos?: Date | string | null
    status?: string
  }

  export type DocumentoUpdateWithoutTipoDocumentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    lancamento?: LancamentoUpdateOneRequiredWithoutDocumentosNestedInput
  }

  export type DocumentoUncheckedUpdateWithoutTipoDocumentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }

  export type DocumentoUncheckedUpdateManyWithoutTipoDocumentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    lancamentoId?: StringFieldUpdateOperationsInput | string
    caminhoOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    nomeOriginal?: StringFieldUpdateOperationsInput | string
    colunaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    planilhaOrigem?: NullableStringFieldUpdateOperationsInput | string | null
    tamanhoBytes?: IntFieldUpdateOperationsInput | number
    dataDocumento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dataInclusao?: DateTimeFieldUpdateOperationsInput | Date | string
    observacao?: NullableStringFieldUpdateOperationsInput | string | null
    usuarioResponsavel?: NullableStringFieldUpdateOperationsInput | string | null
    urlPublica?: NullableStringFieldUpdateOperationsInput | string | null
    deletarApos?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ClienteCountOutputTypeDefaultArgs instead
     */
    export type ClienteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClienteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgenciaCountOutputTypeDefaultArgs instead
     */
    export type AgenciaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgenciaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VeiculoCountOutputTypeDefaultArgs instead
     */
    export type VeiculoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VeiculoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ColaboradorCountOutputTypeDefaultArgs instead
     */
    export type ColaboradorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ColaboradorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LancamentoCountOutputTypeDefaultArgs instead
     */
    export type LancamentoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LancamentoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TipoDocumentoCountOutputTypeDefaultArgs instead
     */
    export type TipoDocumentoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TipoDocumentoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClienteDefaultArgs instead
     */
    export type ClienteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClienteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgenciaDefaultArgs instead
     */
    export type AgenciaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgenciaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VeiculoDefaultArgs instead
     */
    export type VeiculoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VeiculoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ColaboradorDefaultArgs instead
     */
    export type ColaboradorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ColaboradorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LancamentoDefaultArgs instead
     */
    export type LancamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LancamentoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TipoDocumentoDefaultArgs instead
     */
    export type TipoDocumentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TipoDocumentoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentoDefaultArgs instead
     */
    export type DocumentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HistoricoLancamentoDefaultArgs instead
     */
    export type HistoricoLancamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HistoricoLancamentoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MarcacaoComplementacaoDefaultArgs instead
     */
    export type MarcacaoComplementacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MarcacaoComplementacaoDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
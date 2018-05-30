export type Tag<T> = { __doNotUse(n: never): T; };
export function tag<A, T>(a: A): Tagged<A, T> { return a as Tagged<A, T>; }
/**
 * Represents a tagged type.
 *
 * It prevents you from assigning values of the same base type but different or no tag.
 *
 * You should never rely on the `__doNotUse` implementation detail: this property is used for type checking and should
 * never exist at runtime.
 *
 * @param A Base type
 * @param T Tag type
 */
export type Tagged<A, T> = A & Tag<T>;
export type TaggedString<T> = Tagged<string, T>;
export type TaggedNumber<T> = Tagged<number, T>;
export type TaggedDate<T> = Tagged<Date, T>;
export type TaggedBoolean<T> = Tagged<boolean, T>;
export type TaggedArray<A, T> = Tagged<Array<A>, T>;
export type TaggedFunction<A, R, T> = Tagged<(_: A) => R, T>;
export function untag<A, T>(tagged: Tagged<A, T>): A { return tagged; }
export function retag<T2>() { return function<A, T>(tagged: Tagged<A, T>) { return untag(tagged) as Tagged<A, T2>; }; }

/*
// types to be tagged
class Person {}
class Idiot extends Person { public readonly iq: number = 5; }

// tags
enum Foo {}

const ff = 0 as Foo;
const n: number = ff;

// tagged types
type ThisOrThat = TaggedString<'this' | 'that'>;
type FooPerson = Tagged<Person, Foo>;
type FooIdiot = Tagged<Idiot, Foo>;
type FooString = TaggedString<Foo>;
type Email = TaggedString<'Email'>;
type DisplayName = Tagged<string, 'DisplayName'>;
type EmailDisplayName = TaggedString<'Email' & 'DisplayName'>;

// values of tagged types
const thi: ThisOrThat = 'thi' as TaggedString<'this'>;
const both = 'kim.stebel@gmail.com' as EmailDisplayName;
const email = 'foo@example.com' as Email;
const displayName = 'Foo Bar' as DisplayName;
const fp = new Person() as FooPerson;
const fi = new Idiot() as FooIdiot;
const bar = tag<string, 'bar'>('some string');

// tests
const str: string = email;
const dn3: string = displayName;
const email2: Email = email;
const retagged: Email = (displayName as string) as Email; // remove tag first, then add new tag
const email5: Email = both; // tagged with both can be assinged to tagged with one
const email6: DisplayName = both; // tagged with both can be assinged to tagged with one
const foo: FooString = 'foo' as FooString;
const retagged3: Email = retag<'Email'>()(displayName);
*/
// none of those should compile
/*const taggedNull: Tagged<null, 'yay'> = null;
const plainIdiot: Idiot = new Person();
const notNull: Email = null;
const notUndefined: Email = undefined;
const idiot: FooIdiot = fp;
const arr: Array<Email> = ['foo'];
const arr2: Array<Email> = [displayName];
const foo3: FooString = 'foo'; // shouldn't be able to assign plain string to tagged string
const f: Foo = foo; // error: shouldn't extend tag type
const dn2: Email = displayName; // Compilation error: the names don't match
const email3: Email = 'bar@example.com'; // error: not tagged
const email4: Email = 42; // Compilation error: The base type does not match
const methods: Email = email.slice(0, 5); // error: methods on string return untagged string

const f2 = email.__doNotUse; // ideally, this shouldn't compile...

*/

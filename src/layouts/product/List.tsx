import Book from "../../models/Book";
import BookProps from "./compoments/BookProps";

const Lits: React.FC = () => {
    const books: Book[] = [
        {
            id: 1,
            title: 'Book 1',
            description: 'Book 1 description',
            originalPrice: 100,
            price: 80,
            imageUrl: './../../../imges/books/01.jpg'
        },
        {
            id: 2,
            title: 'Book 2',
            description: 'Book 2 description',
            originalPrice: 200,
            price: 150,
            imageUrl: './../../../imges/books/02.jpg'
        },
        {
            id: 3,
            title: 'Book 3',
            description: 'Book 3 description',
            originalPrice: 300,
            price: 250,
            imageUrl: './../../../imges/books/03.jpg'
        },
        {
            id: 4,
            title: 'Book 4',
            description: 'Book 4 description',
            originalPrice: 400,
            price: 350,
            imageUrl: './../../../imges/books/06.jpg'
        },
        {
            id: 5,
            title: 'Book 5',
            description: 'Book 5 description',
            originalPrice: 500,
            price: 450,
            imageUrl: './../../../imges/books/05.jpg'
        }

    ];

    return (
        <div className="container">
            <div className="row mt-4">
                {
                    books.map((book) => (
                        <BookProps
                            book={book}
                        />
                    ))
                }

            </div>
        </div>
    )
}
export default Lits;
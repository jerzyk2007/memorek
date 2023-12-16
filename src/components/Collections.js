import { useEffect } from 'react';
import useData from './hooks/useData';
import './Collections.css';
import CollectionName from './CollectionName';

const Collections = () => {
    const { collectionsData, fetchCollectionsData } = useData();
    const collectionElements = collectionsData.map((element, index) => (
        <CollectionName key={index} name={element.name} count={element.count} />
    ));

    useEffect(() => {
        fetchCollectionsData();
    }, []);

    return (
        <div className='collections'>
            <h2 className='collections-title'>Select collection</h2>
            <section className='collections__elements'>
                {collectionElements}
            </section>

        </div>
    );
};

export default Collections;
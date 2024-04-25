import Link from 'next/link';
import { BucketCardProps } from './BucketCard.interface';

export const BucketCard = ({ bucket }: BucketCardProps) => {
    const { bucketSlug, bucketName, description } = bucket;

    return (
        <Link
            href={`/library/backend/${bucketSlug}`}
            className="border border-navy-200 bg-white rounded-2xl flex cursor-pointer hover:bg-navy-100 flex-col p-6 gap-2"
        >
            <h2 className="text-navy-900 text-xl font-semibold">{bucketName}</h2>
            <p className="text-navy-600 text-base">{description}</p>
        </Link>
    );
}

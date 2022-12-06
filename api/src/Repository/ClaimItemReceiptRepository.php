<?php

namespace App\Repository;

use App\Entity\ClaimItemReceipt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ClaimItemReceipt>
 *
 * @method ClaimItemReceipt|null find($id, $lockMode = null, $lockVersion = null)
 * @method ClaimItemReceipt|null findOneBy(array $criteria, array $orderBy = null)
 * @method ClaimItemReceipt[]    findAll()
 * @method ClaimItemReceipt[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClaimItemReceiptRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ClaimItemReceipt::class);
    }

    public function save(ClaimItemReceipt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ClaimItemReceipt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ClaimItemReceipt[] Returns an array of ClaimItemReceipt objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ClaimItemReceipt
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

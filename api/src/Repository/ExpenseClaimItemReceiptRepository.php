<?php

namespace App\Repository;

use App\Entity\ExpenseClaimItemReceipt;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ExpenseClaimItemReceipt>
 *
 * @method ExpenseClaimItemReceipt|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExpenseClaimItemReceipt|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExpenseClaimItemReceipt[]    findAll()
 * @method ExpenseClaimItemReceipt[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExpenseClaimItemReceiptRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExpenseClaimItemReceipt::class);
    }

    public function save(ExpenseClaimItemReceipt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ExpenseClaimItemReceipt $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ExpenseClaimItemReceipt[] Returns an array of ExpenseClaimItemReceipt objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ExpenseClaimItemReceipt
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

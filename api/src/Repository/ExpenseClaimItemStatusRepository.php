<?php

namespace App\Repository;

use App\Entity\ExpenseClaimItemStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ExpenseClaimItemStatus>
 *
 * @method ExpenseClaimItemStatus|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExpenseClaimItemStatus|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExpenseClaimItemStatus[]    findAll()
 * @method ExpenseClaimItemStatus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExpenseClaimItemStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExpenseClaimItemStatus::class);
    }

    public function save(ExpenseClaimItemStatus $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ExpenseClaimItemStatus $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ExpenseClaimItemStatus[] Returns an array of ExpenseClaimItemStatus objects
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

//    public function findOneBySomeField($value): ?ExpenseClaimItemStatus
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

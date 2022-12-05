<?php

namespace App\Repository;

use App\Entity\ExpenseClaimStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ExpenseClaimStatus>
 *
 * @method ExpenseClaimStatus|null find($id, $lockMode = null, $lockVersion = null)
 * @method ExpenseClaimStatus|null findOneBy(array $criteria, array $orderBy = null)
 * @method ExpenseClaimStatus[]    findAll()
 * @method ExpenseClaimStatus[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExpenseClaimStatusRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ExpenseClaimStatus::class);
    }

    public function save(ExpenseClaimStatus $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ExpenseClaimStatus $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ExpenseClaimStatus[] Returns an array of ExpenseClaimStatus objects
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

//    public function findOneBySomeField($value): ?ExpenseClaimStatus
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

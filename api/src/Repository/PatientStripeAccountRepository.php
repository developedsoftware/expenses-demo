<?php

namespace App\Repository;

use App\Entity\PatientStripeAccount;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PatientStripeAccount>
 *
 * @method PatientStripeAccount|null find($id, $lockMode = null, $lockVersion = null)
 * @method PatientStripeAccount|null findOneBy(array $criteria, array $orderBy = null)
 * @method PatientStripeAccount[]    findAll()
 * @method PatientStripeAccount[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PatientStripeAccountRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PatientStripeAccount::class);
    }

    public function save(PatientStripeAccount $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(PatientStripeAccount $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return PatientStripeAccount[] Returns an array of PatientStripeAccount objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PatientStripeAccount
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}

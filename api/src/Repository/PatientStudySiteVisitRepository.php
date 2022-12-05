<?php

namespace App\Repository;

use App\Entity\PatientStudySiteVisit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PatientStudySiteVisit>
 *
 * @method PatientStudySiteVisit|null find($id, $lockMode = null, $lockVersion = null)
 * @method PatientStudySiteVisit|null findOneBy(array $criteria, array $orderBy = null)
 * @method PatientStudySiteVisit[]    findAll()
 * @method PatientStudySiteVisit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PatientStudySiteVisitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PatientStudySiteVisit::class);
    }

    public function save(PatientStudySiteVisit $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(PatientStudySiteVisit $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return PatientStudySiteVisit[] Returns an array of PatientStudySiteVisit objects
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

//    public function findOneBySomeField($value): ?PatientStudySiteVisit
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
